<template>
  <table>
    <tr>
      <td>
        <input type="number" v-model.number="input" />
      </td>
      <td>=</td>
      <td>
        <span class="output">
          {{ output.toFixed(2) }}
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <select v-model="inputUnit">
          <option v-for="unit in units" :key="unit.id" :value="unit.id">
            {{ unit.label }}
          </option>
        </select>
      </td>
      <td @click="swap" class="fake-link">swap</td>
      <td>
        <select v-model="outputUnit">
          <option v-for="unit in units" :key="unit.id" :value="unit.id">
            {{ unit.label }}
          </option>
        </select>
      </td>
    </tr>
  </table>
</template>

<style scoped>
table {
  margin: 2rem;
  border-collapse: collapse;
}

table,
table * {
  box-sizing: border-box;
  text-align: center;
}

tr:first-child,
tr:first-child * {
  font-size: 3rem;
}

tr:nth-child(2) * {
  font-size: 1.25rem;
  font-family: 'Courier New', Courier, monospace;
}

td:first-child,
td:last-child {
  border: 1px solid #ccc;
}

td:nth-child(2) {
  padding: 0 1.25rem;
}

input,
.output,
select,
option {
  display: block;
  width: 14rem;
  margin: 0;
  padding: 0.5rem;
  border: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

select {
  background-color: #f5f5f5;
}

.fake-link {
  color: #00f;
  cursor: pointer;
  user-select: none;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Converter extends Vue {
  input = 100
  inputUnit = 'f'
  outputUnit = 'c'

  units = [
    { id: 'f', label: 'Fahrenheit' },
    { id: 'c', label: 'Celsius' },
    { id: 'k', label: 'Kelvin' }
  ]

  get output (): number {
    const converters: Record<string, (input: number) => number> = {
      'c-c': (input: number) => input || 0,
      'c-f': (input: number) => ((input || 0) * 9 / 5) + 32,
      'c-k': (input: number) => (input || 0) + 273.15,
      'f-c': (input: number) => ((input || 0) - 32) * 5 / 9,
      'f-f': (input: number) => input || 0,
      'f-k': (input: number) => ((input || 0) - 32) * 5 / 9 + 273.15,
      'k-c': (input: number) => (input || 0) - 273.15,
      'k-f': (input: number) => ((input || 0) - 273.15) * 9 / 5 + 32,
      'k-k': (input: number) => input || 0
    }

    return converters[`${this.inputUnit}-${this.outputUnit}`](this.input)
  }

  swap (): void {
    this.input = parseFloat(this.output.toFixed(2))
    const temp = this.inputUnit
    this.inputUnit = this.outputUnit
    this.outputUnit = temp
  }
}
</script>
