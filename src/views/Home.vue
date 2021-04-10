<template>
  <div class="progress">
    <v-row justify="space-between">
      <v-col>
        <v-btn @click="create">
          新規タスクを追加
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="sort"
          :items="sorting_methods"
          single-line
          class="ml-auto"
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="adding">
      <v-col cols="11">
        <v-text-field
          v-model="new_task"
          solo
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          @click="add_task"
        >追加</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-expansion-panels multiple class="mb-6">
        <Task :data="task" v-for="(task, i) in tasks" :key="i"/>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Task from '@/components/Task.vue'
import sample_data from '../../sample_data'
export default {
  name: 'Home',
  components: {
    Task
  },
  props: ['state'],
  data: function(){
    return {
      sort: "降順",
      sorting_methods: [
        "降順", "昇順", "サブタスク"
      ],
      tasks: sample_data.tasks[this.state],
      adding: false,
      new_task: "",
    }
  },
  methods: {
    create: function(){
      this.adding = true;
    },
    add_task: function(){
      // タスク追加処理

      this.adding = false;
      this.new_task = "";
    }
  }
}
</script>
