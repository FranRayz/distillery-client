<template>
  <div class="distillery-test">
    <div class="test-focus">
      <div class="test__header">
        <h3>Тестирование</h3>
        <h4>{{test.text}}</h4>
      </div>
      <div class="test__content">
        <div class="test__question"
             v-for="question in test.questions"
             :key="question.id">
          <div class="question__header">
            {{question.text}}
          </div>
          <div class="question__content">
            <div class="question__answer"
                 v-for="answer in question.answers"
                 :key="answer.id"
                 @click="select(question.id, answer.id)"
                 :class="{selected: answer.isSelected}">
              {{answer.text}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import api from '../api';

export default {
  name: 'distillery-test',
  data () {
    return {
      test: {
        text: 'Название',
        questions: [
          // {
          //   id: 0,
          //   text: 'question 1',
          //   answers: [
          //     {
          //       id: 0,
          //       text: 'answer 1',
          //       isSelected: false
          //     },
          //     {
          //       id: 1,
          //       text: 'answer 2',
          //       isSelected: false
          //     },
          //     {
          //       id: 2,
          //       text: 'answer 3',
          //       isSelected: false
          //     },
          //     {
          //       id: 3,
          //       text: 'answer 4',
          //       isSelected: false
          //     }
          //   ]
          // },
          // {
          //   id: 1,
          //   text: 'question 2',
          //   answers: [
          //     {
          //       id: 4,
          //       text: 'answer 1',
          //       isSelected: false
          //     },
          //     {
          //       id: 5,
          //       text: 'answer 2',
          //       isSelected: false
          //     },
          //     {
          //       id: 6,
          //       text: 'answer 3',
          //       isSelected: false
          //     },
          //     {
          //       id: 7,
          //       text: 'answer 4',
          //       isSelected: false
          //     }
          //   ]
          // }
        ]
      }
    };
  },
  methods: {
    select(questionId, answerId) {
      let question = this.test.questions.find(x => x.id == questionId);
      let selectedAnswer = question.answers.find(x => x.isSelected == true);
      selectedAnswer ? selectedAnswer.isSelected = false : null;
      question.answers.find(x => x.id == answerId).isSelected = true;
    }
  },
  async created() {
    let response;

    try {
      response = await api.get(`tests/17`).then(r => r.json());
      console.log(response);

      if (response == 'Unauthorized') {
        this.errorMessage = 'Необходимо авторизоваться'
      } else {
        this.test = response;
      }
    } catch {
      this.errorMessage = 'Не удалось сделать запрос к базе данных.';
    }
  }
}
</script>


<style media="screen">
  .distillery-test {
    display: flex;
    justify-content: center;
  }

  .test-focus {
    width: 768px;
    height: 100%;
    padding: 79px 0 61px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .test__header {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 41px;
    text-align: center;
  }

  .test__header h3 {
    margin: 5px;
    color: #d8a462;
    text-transform: uppercase;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 1.9px;
    font-weight: 400;
  }

  .test__header h4 {
    margin: 0;
    color: #7c6d85;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 1.3;
    letter-spacing: 2.9px;
    font-weight: 400;
  }

  .test__content {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .test__question {
    padding: 10px;
    margin: 20px;
    user-select: none;
    margin-bottom: 30px;
  }

  .question__header {
    padding-top: 10px;
    border-top: 1px solid #d8a462;
    margin: 0;
    padding-bottom: 5px;
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: 1.5px;
    color: #7c6d85;
    text-align: center;
  }

  .question__header::after {
    content: "";
    display: block;
    width: 30%;
    margin: 10px auto 0;
    border-top: 1px solid #7c6d85;
  }

  .question__content {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  .question__answer {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d8a462;
    padding: 10px;
    color: #7c6d85;
    cursor: pointer;
    border-radius: 2px;
  }

  .question__answer.selected {
    background-color: #d8a462;
    color: #fff;
  }
</style>
