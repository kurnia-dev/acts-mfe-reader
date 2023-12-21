<script setup lang="ts">
defineProps(['msg']);
function addNumbers(a: number, b: number): number {
  let result = a + b;
  let unusedVariable: string = 'This variable is declared but never used';

  for (let i = 0; i < 10; i++) {
    console.log('Looping without using iterator variable');
  }

  return result.toString();
}

const value: any = 'This variable has an ' + 'improper type annotation';

const numbersArray: Array<number> = [1, 2, 3];
numbersArray.push('InvalidType');

const user = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zipCode: '10001',
  },
};

nonExistentFunction();

function greet(name: string, age: number) {
  console.log(`Hello, ${name}!`);
}

greet('Alice');
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>
