<template>
  <div
    v-show="isAnimating && visible"
    :class="[
      'fixed rounded-3xl bottom-[1rem] p-4 right-[1rem] m-4 overflow-hidden',
      typeClass,
      { 'toast-animation': isAnimating && visible, disappear: !visible },
    ]"
    role="alert"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <Icon :name="iconName" size="40" :color="iconColor" class="mr-2" />
        <div>
          <strong>{{ title }}</strong>
          <p>{{ content }}</p>
        </div>
      </div>
      <Button type="button" variant="none" @click="closeAlert">
        <Icon name="X" size="24" color="white" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import Icon from "@/components/atoms/IconByName.vue";
import Button from "@/components/atoms/Button.vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: "white",
  },
  isVisible: {
    type: Boolean,
    default: false, // Por defecto oculto
  },
});

const visible = ref(props.isVisible);
const isAnimating = ref(visible.value);

const typeClass = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-alertSuccessBg text-background";
    case "error":
      return "bg-alertErrorBg text-background";
    case "warning":
      return "bg-alertWarningBg text-background";
    case "info":
      return "bg-alertInfoBg text-background";
    default:
      return "bg-stateVariant text-background";
  }
});

const iconName = computed(() => {
  switch (props.type) {
    case "success":
      return "CheckCircle";
    case "error":
      return "CircleX";
    case "warning":
      return "MessageCircleWarning";
    case "info":
      return "Info";
    default:
      return "Info";
  }
});

function closeAlert() {
  visible.value = false;
  setTimeout(() => {
    isAnimating.value = false;
  }, 400);
}

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      visible.value = true;
      isAnimating.value = true;
    }
  }
);
</script>

<style scoped>
.toast-animation {
  animation: toast 0.4s ease-in-out;
}

@keyframes toast {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.disappear {
  animation: disappear 0.4s ease-in-out forwards;
}

@keyframes disappear {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
