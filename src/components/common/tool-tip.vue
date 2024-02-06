<script setup lang="jsx">
import { nextTick, Teleport, Transition, ref } from "vue";

let show = ref(false);
let props = defineProps({
  title: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const showPop = (e) => {
  if (props.disabled) return;
  if (!props.title) return;
  e.stopPropagation();
  let rect = e.target.getBoundingClientRect();
  show.value = true;
  nextTick(() => {
    let tip = $refs.tip?.getBoundingClientRect();
    if (!tip) return;
    if (rect.top < 50) {
      $refs.tip.style.top = rect.top + rect.height + 10 + "px";
    } else {
      $refs.tip.style.top = rect.top - tip.height - 10 + "px";
    }
    let tipWidth = tip.width;
    let rectWidth = rect.width;
    $refs.tip.style.left = rect.left - (tipWidth - rectWidth) / 2 + "px";
  });
};

const Vnode = $slots.default()[0];
</script>

<template>
  <div>
    <Teleport to="body">
      <Transition name="fade">
        <div ref="tip" class="tip" v-show="show && props.title">
          {{ props.title }}
        </div>
      </Transition>
    </Teleport>
    <component
        :is="Vnode"
        @click="show = false"
        @mouseenter="showPop"
        @mouseleave="show = false"
    />
  </div>
</template>

<style scoped lang="scss">

.tip {
  position: fixed;
  font-size: 14rem;
  z-index: 9999;
  border-radius: 4rem;
  padding: 10rem;
  color: var(--color-font-1);
  background: var(--color-tooltip-bg);
  //box-shadow: 1px 1px 6px #bbbbbb;
  box-shadow: 0 0 6px 1px var(--color-tooltip-shadow);
}
</style>
