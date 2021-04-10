<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row justify="center">
        <v-col v-if="editing">
          <v-text-field
              v-model="task.task"
              solo
              autofocus
              @blur="finish_edit"
            ></v-text-field>
        </v-col>
        <v-col v-else>
          {{ task.task }}
        </v-col>
      </v-row>
      <v-col cols="1" v-if="!editing">
          <v-btn color="primary" @click.stop="edit">
            <v-icon>
              mdi-square-edit-outline
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="primary" @click.stop="create_problem">
            <v-icon>
              mdi-pencil-plus
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="task.state"
            single-line
            class="ml-auto"
            :items="['進行中', '保留', '終了済み']"
            dense
            @click.stop
          ></v-select>
        </v-col>
    </v-expansion-panel-header>
    <v-row justify="center" v-if="adding">
      <v-col cols="10">
        <v-text-field
          v-model="new_problem"
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          @click="add_problem"
        >追加</v-btn>
      </v-col>
    </v-row>
    <v-expansion-panel-content>
      <v-expansion-panels multiple class="mb-6">
        <Problem :data="problem" v-for="(problem, i) in problems" :key="i"/>
      </v-expansion-panels>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import sample_data from '../../sample_data'
import Problem from '@/components/Problem.vue'

export default {
  name: 'Task',
  props: ['data'],
  components: {
    Problem
  },
  data: function(){
    return {
      task: this.data,
      problems: sample_data.problems,
      editing: false,
      adding: false,
      new_problem: "",
    }
  },
  methods: {
    create_problem: function(){
      this.adding = true;
    },
    add_problem: function(){
      // 問題追加処理
      
      this.new_problem = "";
      this.adding = false;
    },
    edit: function(){
      this.editing = true;
    },
    finish_edit: function(){
      // タスク更新処理

      this.editing = false;
    }
  }
}
</script>