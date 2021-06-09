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
        <v-col @click.stop="edit" v-else>
          {{ task.task }}
        </v-col>
      </v-row>
      <v-col cols="1">
        <v-btn color="primary" @click.stop="create_problem">
          <v-icon>
            mdi-pencil-plus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="state"
          single-line
          class="ml-auto"
          :items="states"
          item-text="text"
          item-value="value"
          dense
          @click.stop
          @change="state_change"
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
      editing: false,
      adding: false,
      new_problem: "",
      problems: [],
      states: [
        { value: 0, text: "進行中" },
        { value: 1, text: "保留" },
        { value: 2, text: "終了済み" }
      ],
      state: {}
    }
  },
  methods: {
    create_problem: function(){
      this.adding = true;
    },
    add_problem: function(){
      // 問題追加処理
      this.$crud.problem.create(this.new_problem, this.task.id).then(res => {
        if(!res){
          console.log('error!');
          return;
        }
        this.new_problem = "";
        this.adding = false;
        this.$crud.problem.read_from_task_id(this.data.id).then(res => {
          this.problems = res;
        });
      });
    },
    edit: function(){
      this.editing = true;
    },
    finish_edit: function(){
      // タスク更新処理
      this.$crud.task.update(this.task.id, this.task.task, this.task.state).then(res => {
        if(!res){
          alert('error!');
          return;
        }
        // task更新後の処理を記述する
        this.editing = false;
      });
    },
    state_change(new_state){
      this.task.state = new_state;
      // タスク更新処理
      this.$crud.task.update(this.task.id, this.task.task, this.task.state).then(res => {
        if(!res){
          alert('error!');
          return;
        }
        this.$emit('task-state-change', new_state);
      });
    }
  },
  created: function(){
    this.$crud.problem.read_from_task_id(this.data.id).then(res => {
      this.problems = res;
    });
    this.state = this.states[this.data.state];
  },
  watch: {
    data: function(new_value){
      this.task = new_value;
      this.$crud.problem.read_from_task_id(new_value.id).then(res => {
      this.problems = res;
      this.state = this.states[new_value.state];
    });
    }
  }
}
</script>