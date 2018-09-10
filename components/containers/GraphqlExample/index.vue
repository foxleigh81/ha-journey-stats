<!-- GraphQL Example file, this is to show syntax and will not run -->
<template>
  <ul>
    <li v-if="loading">Loading...</li>
    <li v-for="term in allTerms" :key="term.id">
      {{term.definition}}
    </li>
  </ul>
</template>

<script src="./scripts.js"></script>
