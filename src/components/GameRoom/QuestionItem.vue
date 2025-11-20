<template>
    <li class="question-item" :class="{
        'solved': room.answers?.[wordId]?.correct,
        'locked': room.answers?.[wordId]?.correct
    }">
        <div class="question-clue">
            <div v-if="word.imageUrl" class="question-image">
                <img :src="word.imageUrl" :alt="word.clue" />
            </div>
            <div class="clue-content">
                <span>{{ word.clue }}</span>
                <button class="speak-btn" @click="speakWord" :disabled="isSpeaking" :title="`Phát âm: ${word.answer}`">
                    <span v-if="!isSpeaking">🔊</span>
                    <span v-else>⏸️</span>
                </button>
            </div>
        </div>

        <div v-if="room.answers?.[wordId]?.correct" class="answer-status correct">
            ✅ Đã giải! Đáp án: {{ word.answer.toUpperCase() }}
            <div class="answered-by">
                Trả lời bởi: {{ getPlayerName(room.answers[wordId]?.answeredBy) }}
            </div>
        </div>

        <div v-else>
            <!-- Type Mode: Input field -->
            <div v-if="!isArrangeMode" class="answer-input">
                <input v-model="localAnswer" :placeholder="'_'.repeat(word.answer.length)"
                    :maxlength="word.answer.length" @keyup.enter="$emit('submit-answer', wordId, word.answer)"
                    :disabled="room.answers?.[wordId]?.correct || timerExpired" />
                <button @click="$emit('submit-answer', wordId, word.answer)" :disabled="timerExpired">
                    Gửi
                </button>
            </div>

            <!-- Arrange Mode: Letter arrangement with drag & drop -->
            <div v-else class="arrange-mode">
                <div class="arrange-slots">
                    <div v-for="(slot, index) in word.answer.length" :key="`slot-${wordId}-${index}`"
                        class="letter-slot" :class="{ 'filled': arrangedLetters[wordId]?.[index] }"
                        @drop="$emit('drop', $event, wordId, index)" @dragover.prevent
                        @dragenter.prevent="(e) => e.currentTarget.classList.add('drag-over')"
                        @dragleave.prevent="(e) => e.currentTarget.classList.remove('drag-over')">
                        <div v-if="arrangedLetters[wordId]?.[index]" class="letter-box arranged draggable"
                            :draggable="true" @dragstart="$emit('drag-start', $event, wordId, index)"
                            @dragend="$emit('drag-end', $event)">
                            {{ arrangedLetters[wordId][index].toUpperCase() }}
                        </div>
                        <span v-else class="slot-placeholder">{{ index + 1 }}</span>
                    </div>
                </div>

                <div class="available-letters" v-if="availableLetters[wordId] && availableLetters[wordId].length > 0">
                    <p style="font-size: 14px; color: #666; margin-bottom: 8px; text-align: center; width: 100%;">
                        Kéo các ký tự vào ô trống:
                    </p>
                    <div>
                        <div v-for="(char, index) in availableLetters[wordId]" :key="`available-${wordId}-${index}`"
                            class="letter-box available draggable" :draggable="true"
                            @dragstart="$emit('drag-start', $event, wordId, index, true)"
                            @dragend="$emit('drag-end', $event)">
                            {{ char.toUpperCase() }}
                        </div>
                    </div>
                </div>
                <div v-else style="padding: 0px 20px; text-align: center; color: #999;">
                    <p></p>
                </div>

                <button @click="$emit('submit-arranged-answer', wordId, word.answer)"
                    :disabled="!isArrangementComplete || timerExpired || room.answers?.[wordId]?.correct"
                    style="margin-top: 16px;">
                    Gửi
                </button>
            </div>

            <div v-if="answerStatus[wordId]" class="answer-status"
                :class="answerStatus[wordId].correct ? 'correct' : 'incorrect'">
                {{ answerStatus[wordId].message }}
            </div>
        </div>
    </li>
</template>

<style scoped>
.available-letters div {
    display: flex;
    column-gap: 8px;
}

.clue-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.clue-content span {
    flex: 1;
    min-width: 0;
}

.speak-btn {
    background: #667eea;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 18px;
    padding: 0;
    margin: 0;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.speak-btn:hover:not(:disabled) {
    background: #5568d3;
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.speak-btn:active:not(:disabled) {
    transform: scale(0.95);
}

.speak-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

@media (max-width: 480px) {
    .speak-btn {
        width: 36px;
        height: 36px;
        font-size: 16px;
    }
}
</style>
<script setup>
import { computed, ref, onUnmounted } from 'vue';

const props = defineProps({
    word: { type: Object, required: true },
    wordId: { type: String, required: true },
    room: { type: Object, required: true },
    isArrangeMode: { type: Boolean, default: true },
    arrangedLetters: { type: Object, default: () => ({}) },
    availableLetters: { type: Object, default: () => ({}) },
    answerStatus: { type: Object, default: () => ({}) },
    timerExpired: { type: Boolean, default: false },
    answers: { type: Object, default: () => ({}) },
    isArrangementComplete: { type: Boolean, default: false },
    getPlayerName: { type: Function, required: true }
});

const emit = defineEmits(['submit-answer', 'submit-arranged-answer', 'drag-start', 'drag-end', 'drop', 'update:answers']);

const localAnswer = computed({
    get: () => props.answers[props.wordId] || '',
    set: (value) => {
        emit('update:answers', { ...props.answers, [props.wordId]: value });
    }
});

const isSpeaking = ref(false);

const speakWord = () => {
    if (!props.word.answer) return;

    // Dừng phát âm hiện tại nếu có
    if (isSpeaking.value) {
        speechSynthesis.cancel();
        isSpeaking.value = false;
        return;
    }

    // Kiểm tra browser support
    if (!('speechSynthesis' in window)) {
        alert('Trình duyệt của bạn không hỗ trợ tính năng phát âm');
        return;
    }

    isSpeaking.value = true;

    const utter = new SpeechSynthesisUtterance(props.word.answer);
    utter.lang = 'en-US'; // Tiếng Anh
    utter.rate = 0.8; // Tốc độ phát âm (0.1 - 10)
    utter.pitch = 1; // Cao độ (0 - 2)
    utter.volume = 1; // Âm lượng (0 - 1)

    utter.onend = () => {
        isSpeaking.value = false;
    };

    utter.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        isSpeaking.value = false;
    };

    speechSynthesis.speak(utter);
};

// Cleanup: Dừng phát âm khi component unmount
onUnmounted(() => {
    if (isSpeaking.value) {
        speechSynthesis.cancel();
    }
});
</script>
