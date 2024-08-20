import { ref, onMounted, onUnmounted } from "vue";

const isLoading = ref(false);

export function useLoading() {
  const startLoading = () => {
    isLoading.value = true;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  // Agregar estilos del loader al DOM cuando el componente se monta
  onMounted(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .global-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
      }

      .global-loader span {
        height: 80px;
        aspect-ratio: 1;
        display: grid;
      }

      .global-loader span:before,
      .global-loader span:after {
        content: "";
        --c: no-repeat linear-gradient(var(--button-primary) 0 0);
        background: var(--c), var(--c);
        background-size: 25% 50%;
        animation: l5 1.5s infinite linear;
      }

      .global-loader span:after {
        transform: scale(-1);
      }

      @keyframes l5 {
        0%, 5% {
          background-position: 33.4% 100%, 66.6% 100%;
        }
        25% {
          background-position: 33.4% 100%, 100% 0;
        }
        50% {
          background-position: 0 0, 100% 0;
        }
        75% {
          background-position: 0 0, 66.6% 100%;
        }
        95%, 100% {
          background-position: 33.4% 100%, 66.6% 100%;
        }
      }
    `;
    document.head.appendChild(style);
  });

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}
