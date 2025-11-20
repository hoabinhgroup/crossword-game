<template>
    <li class="question-item" :class="{
        'solved': room.answers?.[wordId]?.correct,
        'locked': room.answers?.[wordId]?.correct
    }">
        <div class="question-clue">
            <div v-if="word.imageUrl" class="question-image">
                <img :src="word.imageUrl" :alt="word.clue" />
            </div>
            <div>{{ word.clue }}</div>
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

<style>
.available-letters div {
    display: flex;
    column-gap: 8px;
}
</style>
<script setup>
import { computed } from 'vue';

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
</script>
