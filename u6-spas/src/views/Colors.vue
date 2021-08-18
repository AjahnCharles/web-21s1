<template>
  <div>
    <h1>Colors</h1>

    {{ red }}, {{ green }}, {{ blue }}

    <div class="color-editor">
      <label for="inRed">R:</label>
      <input
        id="inRed"
        v-model.number="red"
        type="number"
        min="0"
        max="255"
        step="1"
      />

      <label for="inGreen">G:</label>
      <input
        id="inGreen"
        v-model.number="green"
        type="number"
        min="0"
        max="255"
        step="1"
      />

      <label for="inBlue">B:</label>
      <input
        id="inBlue"
        v-model.number="blue"
        type="number"
        min="0"
        max="255"
        step="1"
      />
    </div>

    <div
      :style="{ backgroundColor: colorHex, color: contrastHex }"
      class="color-hex"
    >
      {{ colorHex }}
    </div>

    <div v-if="colors.length" class="color-favorites">
      <h2>Favorites:</h2>
      <ul>
        <li v-for="color in colors" :key="color.name" @click="setColor(color)">
          <span class="name">{{ color.name }}</span>
          <span class="details">
            [ {{ color.r }}, {{ color.g }}, {{ color.b }} ]
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.color-editor {
  text-align: center;
}

.color-editor label {
  font-size: 1.2rem;
  padding-right: 0.4rem;
}

.color-editor input {
  width: 3.5rem;
  margin-right: 1rem;
  font-family: monospace;
  font-size: 1.2rem;
}

.color-hex {
  width: 6rem;
  padding: 1.5rem;
  margin: 2rem auto;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
  font-family: monospace;
  font-size: 1.4rem;
  text-align: center;
}

.color-favorites ul {
  list-style: none;
}

.color-favorites .name {
  text-transform: capitalize;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  padding-right: 5px;
}

.color-favorites .details {
  color: #999;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

interface Color {
  name: string
  r: number
  g: number
  b: number
}

@Component
export default class Colors extends Vue {
  red = 0
  green = 0
  blue = 0

  colors: Array<Color> = [
    { name: 'black', r: 0, g: 0, b: 0 },
    { name: 'white', r: 255, g: 255, b: 255 },
    { name: 'red', r: 255, g: 0, b: 0 },
    { name: 'purple', r: 255, g: 0, b: 255 }
  ]

  get colorHex (): string {
    return (
      '#' +
      this.red.toString(16).padStart(2, '0') +
      this.green.toString(16).padStart(2, '0') +
      this.blue.toString(16).padStart(2, '0')
    )
  }

  get contrastHex (): string {
    const l = (
      0.2126 * this.red * this.red +
      0.7152 * this.green * this.green +
      0.0722 * this.blue * this.blue
    ) / 65025
    return l > 0.2 ? '#000' : '#FFF'
  }

  setColor (color: Color): void {
    this.red = color.r
    this.green = color.g
    this.blue = color.b
  }
}
</script>
