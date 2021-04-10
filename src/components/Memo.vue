<template>
  <v-expansion-panel>
    <v-card>
      <v-card-text>
        <div>{{ updated_date }}</div>
        <p>
          {{ memo.memo }}
        </p>
      </v-card-text>
    </v-card>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'Memo',
  props: ["data"],
  data: function(){
    return {
      memo: this.data
    }
  },
  computed: {
    updated_date: function(){
      let date = new Date(this.memo.updated_at);
      console.log()
      return (date.getYear() + 1900) + "-" + date.getMonth() + '-' + date.getDate();
    }
  }
}
</script>