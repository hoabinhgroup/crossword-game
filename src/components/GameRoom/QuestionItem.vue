<template>
    <li class="question-item" :class="{
        'solved': room.answers?.[wordId]?.correct,
        'locked': room.answers?.[wordId]?.correct
    }" :data-word-id="wordId">
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
                        class="letter-slot"
                        :class="{ 'filled': arrangedLetters[wordId]?.[index], 'drag-over': touchDropTarget === index && touchWordId === wordId }"
                        :data-slot-index="index" @drop="$emit('drop', $event, wordId, index)" @dragover.prevent
                        @dragenter.prevent="(e) => e.currentTarget.classList.add('drag-over')"
                        @dragleave.prevent="(e) => e.currentTarget.classList.remove('drag-over')">
                        <div v-if="arrangedLetters[wordId]?.[index]" class="letter-box arranged draggable"
                            :draggable="true"
                            :class="{ 'touch-dragging': touchDragging && touchSourceIndex === index && touchWordId === wordId && !touchIsFromAvailable }"
                            @dragstart="$emit('drag-start', $event, wordId, index)" @dragend="$emit('drag-end', $event)"
                            @touchstart.prevent="handleTouchStart($event, wordId, index, false)"
                            @touchmove.prevent="handleTouchMove" @touchend.prevent="handleTouchEnd">
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
                            :class="{ 'touch-dragging': touchDragging && touchSourceIndex === index && touchWordId === wordId && touchIsFromAvailable }"
                            @dragstart="$emit('drag-start', $event, wordId, index, true)"
                            @dragend="$emit('drag-end', $event)"
                            @touchstart.prevent="handleTouchStart($event, wordId, index, true)"
                            @touchmove.prevent="handleTouchMove" @touchend.prevent="handleTouchEnd">
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

/* Touch drag and drop improvements */
.letter-box.draggable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    touch-action: none;
    will-change: transform, opacity;
}

.letter-box.touch-dragging {
    opacity: 0.4 !important;
    transform: scale(0.95) !important;
    transition: opacity 0.2s, transform 0.2s;
}

.letter-slot {
    touch-action: none;
    position: relative;
}

.letter-slot.drag-over {
    background: #d4edda !important;
    border-color: #28a745 !important;
    transform: scale(1.05);
    transition: all 0.2s ease;
}

.arrange-mode {
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
}

/* Prevent text selection during drag on iOS */
.arrange-mode * {
    -webkit-tap-highlight-color: transparent;
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

// Touch drag and drop state
const touchDragging = ref(false);
const touchStartX = ref(0);
const touchStartY = ref(0);
const touchSourceIndex = ref(null);
const touchWordId = ref(null);
const touchIsFromAvailable = ref(false);
const touchDropTarget = ref(null);
const touchGhostElement = ref(null);

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

// Touch drag and drop handlers
const handleTouchStart = (event, wordId, index, isFromAvailable) => {
    if (props.timerExpired || props.room.answers?.[props.wordId]?.correct) return;

    const touch = event.touches[0];
    touchStartX.value = touch.clientX;
    touchStartY.value = touch.clientY;
    touchSourceIndex.value = index;
    touchWordId.value = wordId;
    touchIsFromAvailable.value = isFromAvailable;
    touchDragging.value = false;
    touchDropTarget.value = null;

    // Tạo ghost element để hiển thị khi kéo
    const target = event.currentTarget;
    touchGhostElement.value = target.cloneNode(true);
    touchGhostElement.value.style.position = 'fixed';
    touchGhostElement.value.style.pointerEvents = 'none';
    touchGhostElement.value.style.opacity = '0.8';
    touchGhostElement.value.style.zIndex = '9999';
    touchGhostElement.value.style.transform = 'scale(1.15)';
    touchGhostElement.value.style.transition = 'none';
    touchGhostElement.value.style.left = (touch.clientX - 25) + 'px';
    touchGhostElement.value.style.top = (touch.clientY - 25) + 'px';
    touchGhostElement.value.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(touchGhostElement.value);

    // Ẩn element gốc
    target.style.opacity = '0.4';
    target.style.transform = 'scale(0.95)';
};

const handleTouchMove = (event) => {
    if (touchSourceIndex.value === null && touchSourceIndex.value !== 0) {
        event.preventDefault();
        return;
    }

    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX.value);
    const deltaY = Math.abs(touch.clientY - touchStartY.value);

    // Bắt đầu drag sau khi di chuyển 8px (nhỏ hơn để responsive hơn)
    if (!touchDragging.value && (deltaX > 8 || deltaY > 8)) {
        touchDragging.value = true;
        // Prevent scrolling khi đang drag
        event.preventDefault();
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }

    if (touchDragging.value && touchGhostElement.value) {
        event.preventDefault();

        // Sử dụng requestAnimationFrame cho smooth animation
        requestAnimationFrame(() => {
            if (touchGhostElement.value) {
                // Di chuyển ghost element
                touchGhostElement.value.style.left = (touch.clientX - 25) + 'px';
                touchGhostElement.value.style.top = (touch.clientY - 25) + 'px';
            }
        });

        // Tìm element dưới touch point
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        if (elementBelow) {
            // Tìm letter-slot gần nhất
            const slot = elementBelow.closest('.letter-slot');
            if (slot && touchWordId.value === props.wordId) {
                // Lấy index từ data attribute hoặc từ parent
                const dataIndex = slot.getAttribute('data-slot-index');
                const slotIndex = dataIndex !== null ? parseInt(dataIndex) :
                    Array.from(slot.parentElement.querySelectorAll('.letter-slot')).indexOf(slot);

                if (slotIndex !== -1) {
                    // Xóa drag-over từ tất cả slots trước
                    document.querySelectorAll('.letter-slot').forEach(s => {
                        s.classList.remove('drag-over');
                    });

                    // Cho phép drop vào slot trống hoặc swap (kéo từ slot khác)
                    const isFilled = slot.classList.contains('filled');
                    const isFromSlot = !touchIsFromAvailable.value;

                    // Cho phép drop nếu:
                    // 1. Slot trống, hoặc
                    // 2. Đang kéo từ slot khác (swap), hoặc
                    // 3. Đang kéo từ available và slot đã filled (swap)
                    if (!isFilled || isFromSlot || touchIsFromAvailable.value) {
                        // Không cho phép drop vào chính slot đang kéo
                        if (isFromSlot && slotIndex === touchSourceIndex.value) {
                            touchDropTarget.value = null;
                        } else {
                            touchDropTarget.value = slotIndex;
                            slot.classList.add('drag-over');
                        }
                    } else {
                        touchDropTarget.value = null;
                    }
                }
            } else {
                // Xóa drag-over từ tất cả slots
                document.querySelectorAll('.letter-slot').forEach(s => {
                    s.classList.remove('drag-over');
                });
                touchDropTarget.value = null;
            }
        }
    }
};

const handleTouchEnd = (event) => {
    // Restore body scroll
    document.body.style.overflow = '';

    if (!touchDragging.value) {
        // Nếu không phải drag, chỉ cleanup
        cleanupTouch();
        return;
    }

    // Lấy vị trí cuối cùng từ changedTouches
    const touch = event.changedTouches[0];
    let finalDropTarget = touchDropTarget.value;

    // Nếu không có drop target từ move, thử tìm lại từ vị trí cuối
    if (finalDropTarget === null) {
        // Sử dụng setTimeout để đảm bảo element được update
        setTimeout(() => {
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            if (elementBelow) {
                const slot = elementBelow.closest('.letter-slot');
                if (slot && touchWordId.value === props.wordId) {
                    const dataIndex = slot.getAttribute('data-slot-index');
                    const slotIndex = dataIndex !== null ? parseInt(dataIndex) :
                        Array.from(slot.parentElement.querySelectorAll('.letter-slot')).indexOf(slot);
                    if (slotIndex !== -1) {
                        const isFilled = slot.classList.contains('filled');
                        const isFromSlot = !touchIsFromAvailable.value;

                        // Cho phép drop nếu slot trống hoặc swap
                        if (!isFilled || isFromSlot || touchIsFromAvailable.value) {
                            // Không cho phép drop vào chính slot đang kéo
                            if (isFromSlot && slotIndex === touchSourceIndex.value) {
                                cleanupTouch();
                                return;
                            }
                            finalDropTarget = slotIndex;
                            performDrop(finalDropTarget);
                            return;
                        }
                    }
                }
            }
            // Nếu không tìm thấy drop target, chỉ cleanup
            cleanupTouch();
        }, 50);
        return;
    }

    // Xóa drag-over từ tất cả slots
    document.querySelectorAll('.letter-slot').forEach(s => {
        s.classList.remove('drag-over');
    });

    // Thực hiện drop
    performDrop(finalDropTarget);
};

const performDrop = (slotIndex) => {
    if (slotIndex === null || touchWordId.value !== props.wordId || touchSourceIndex.value === null) {
        cleanupTouch();
        return;
    }

    const wordId = props.wordId;
    const sourceIndex = touchSourceIndex.value;
    const isFromAvailable = touchIsFromAvailable.value;

    // Tạo synthetic drag-start event để set drag state
    const dragStartEvent = new Event('dragstart', { bubbles: true, cancelable: true });
    dragStartEvent.dataTransfer = {
        effectAllowed: 'move'
    };

    // Emit drag-start trước để set drag state
    emit('drag-start', dragStartEvent, wordId, sourceIndex, isFromAvailable);

    // Đợi để đảm bảo drag state được set (sử dụng multiple requestAnimationFrame cho chắc chắn)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Tạo synthetic drop event
            const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
            dropEvent.dataTransfer = {
                effectAllowed: 'move'
            };
            dropEvent.preventDefault = () => { };

            // Tìm slot element trong cùng component
            const componentElement = document.querySelector(`[data-word-id="${wordId}"]`);
            if (componentElement) {
                const slots = componentElement.querySelectorAll('.letter-slot');
                if (slots[slotIndex]) {
                    // Set currentTarget cho event để match với drag & drop API
                    try {
                        Object.defineProperty(dropEvent, 'currentTarget', {
                            value: slots[slotIndex],
                            writable: false,
                            configurable: true
                        });
                    } catch (e) {
                        // Fallback nếu không thể set currentTarget
                        console.warn('Could not set currentTarget:', e);
                    }
                }
            }

            // Emit drop event với slot index
            emit('drop', dropEvent, wordId, slotIndex);

            // Emit drag-end sau một chút để đảm bảo drop được xử lý
            setTimeout(() => {
                const dragEndEvent = new Event('dragend', { bubbles: true, cancelable: true });
                emit('drag-end', dragEndEvent);
                cleanupTouch();
            }, 150);
        });
    });
};

const cleanupTouch = () => {
    // Restore body scroll
    document.body.style.overflow = '';

    // Xóa ghost element với animation
    if (touchGhostElement.value) {
        touchGhostElement.value.style.transition = 'opacity 0.2s ease-out';
        touchGhostElement.value.style.opacity = '0';
        setTimeout(() => {
            if (touchGhostElement.value && touchGhostElement.value.parentNode) {
                document.body.removeChild(touchGhostElement.value);
            }
            touchGhostElement.value = null;
        }, 200);
    }

    // Khôi phục style của tất cả elements
    document.querySelectorAll('.letter-box').forEach(el => {
        el.style.opacity = '';
        el.style.transform = '';
    });

    // Reset state
    touchDragging.value = false;
    touchStartX.value = 0;
    touchStartY.value = 0;
    touchSourceIndex.value = null;
    touchWordId.value = null;
    touchIsFromAvailable.value = false;
    touchDropTarget.value = null;

    // Xóa drag-over từ tất cả slots
    document.querySelectorAll('.letter-slot').forEach(s => {
        s.classList.remove('drag-over');
    });
};

// Cleanup: Dừng phát âm và touch drag khi component unmount
onUnmounted(() => {
    if (isSpeaking.value) {
        speechSynthesis.cancel();
    }
    cleanupTouch();
});
</script>
