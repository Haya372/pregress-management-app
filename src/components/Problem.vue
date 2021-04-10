<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row justify="center">
        <v-col v-if="editing">
          <v-text-field
            v-model="problem.problem"
            solo
            autofocus
            @blur="finish_edit"
          ></v-text-field>
        </v-col>
        <v-col v-else>
          {{ problem.problem }}
        </v-col>
        <v-col cols="1" v-if="!editing">
          <v-btn color="primary" @click.stop="edit">
            <v-icon>
              mdi-square-edit-outline
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="primary" @click.stop="create_memo">
            <v-icon>
              mdi-pencil-plus
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-checkbox
            v-model="problem.solved"
            color="success"
            @click.stop
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-row justify="center" v-if="adding">
      <v-col cols="10">
        <v-text-field
          v-model="new_memo"
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          @click="add_memo"
        >追加</v-btn>
      </v-col>
    </v-row>
    <v-expansion-panel-content>
      <Memo :data="memo" v-for="(memo, i) in memos" :key="i"/>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import sample_data from '../../sample_data'
import Memo from '@/components/Memo.vue'

export default {
  name: "Problem",
  props: ["data"],
  components: {
    Memo
  },
  data: function(){
    return {
      problem: this.data,
      memos: sample_data.memos,
      editing: false,
      adding: false,
      new_memo: "",
    }
  },
  methods: {
    create_memo: function(){
      this.adding = true;
    },
    add_memo: function(){
      // メモ追加処理
      
      this.new_memo = "";
      this.adding = false;
    },
    edit: function(){
      this.editing = true;
    },
    finish_edit: function(){
      // 問題更新処理

      this.editing = false;
    }
  }
}
</script>