<template>
  <v-expansion-panel>
    <v-card>
      <v-card-text>
        <div>{{ updated_date }}</div>
        <v-text-field
          v-model="memo.memo"
          solo
          autofocus
          @blur="finish_edit"
          v-if="editing"
        ></v-text-field>
        <p @click.stop="editing = true" v-else>
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
      memo: this.data,
      editing: false
    }
  },
  computed: {
    updated_date: function(){
      let date = new Date(this.memo.updated_at);
      console.log()
      return (date.getYear() + 1900) + "-" + date.getMonth() + '-' + date.getDate();
    }
  },
  methods: {
    finish_edit: function(){
      this.$crud.memo.update(this.memo.id, this.memo.memo).then(res => {
        if(!res){
          alert("error!");
          return;
        }
        this.editing = false;
      });
    }
  }
}
</script>