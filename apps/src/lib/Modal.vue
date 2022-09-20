<template>
  <transition name="modal">
    <div class="modal">
      <div class="sgds-container modal-wrapper">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.modal-wrapper {
  background-color: #fff;
  overflow-y: auto;
  padding: 16px;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  align-items: center;
}

/* Transition */
.modal-enter {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
</style>