<template>
  <div class="distillery-test">
    <div class="test-focus">
      <div class="test__header">
        <h3>Создание теста</h3>
        <h4>
          <input type="text" placeholder="Введите название теста"
                 v-model.trim="testBuilder.text">
        </h4>
        <div class="test__vacancy">
          <div class="vacancy__header">
            Закрепить за вакансией:
          </div>
          <select @change="selectVacancy($event)" id="vacancies">
            <option v-for="vacancy,i in vacancies"
                    :key="i">
              {{vacancy.text}}
            </option>
          </select>
        </div>
      </div>
      <div class="test__content">
        <div class="test__question"
             v-for="question,i in testBuilder.questions"
             :key="i">
          <div class="question__header">
            <input type="text" placeholder="Введите вопрос"
                   v-model.trim="question.text">
            <div class="question-delete"
                 @click="deleteQuestion(question)">
              <i class="fas fa-trash"></i>
            </div>
          </div>
          <div class="question__content"
               v-if="question.type == 'default'">
            <div class="question__answer"
                 v-for="answer,j in question.answers"
                 :key="j"
                 :class="{correct: answer.is_correct}">
              <div class="answer-is-correct answer__button"
                   @click="correctAnswer(question, answer)">
                <i class="fas fa-check"></i>
              </div>
              <input class="answer__text" type="text" placeholder="Введите вариант ответа"
                     v-model.trim="answer.text">
              <div class="answer-delete answer__button"
                   @click="deleteAnswer(question, answer)">
                <i class="fas fa-trash"></i>
              </div>
            </div>
            <div class="question__answer answer-add"
                 @click="addAnswer(question)">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div class="question__info"
               v-if="question.type == 'info'">
             <div class="answer__info">
               Здесь будет поле ввода пользовательской информации
             </div>
          </div>
        </div>
        <div class="test__question">
          <div class="question__header">
            <div class="question-add"
                 @click="addQuestion()">
              Добавить вопрос
            </div>
            <div class="question-add"
                 @click="addQuestion('info')">
              Добавить вопрос-информацию
            </div>
          </div>
        </div>
      </div>
      <div class="test-create"
           @click="createTest()">
        Сохранить тест
      </div>
    </div>
  </div>
</template>

<script>

import api from '../api';

export default {
  data () {
    return {
      vacancies: [],

      testBuilder: {
        text: '',
        vacancy_id: 0,
        questions: []
      }

    };
  },
  methods: {
    selectVacancy(e) {
      let vacancy = this.vacancies.find(x => x.text == e.target.value);
      this.testBuilder.vacancy_id = vacancy.id;
    },
    addAnswer(question) {
      question.answers.push({
        text: '',
        is_correct: false
      })
    },
    deleteAnswer(question, answer) {
      let i = question.answers.findIndex(x => x == answer);
      question.answers.splice(i, 1);
    },
    correctAnswer(question, answer) {
      question.answers.forEach(item => {
        if (item != answer) {
          item.is_correct = false;
        }
      });
      answer.is_correct = !answer.is_correct;
    },
    addQuestion(type='default') {
      this.testBuilder.questions.push({
        text: '',
        type: type,
        answers: [
          {
            text: '',
            is_correct: true
          },
        ]
      })
    },
    deleteQuestion(question) {
      let i = this.testBuilder.questions.findIndex(x => x == question);
      this.testBuilder.questions.splice(i, 1);
    },
    async createTest() {
      console.log(this.testBuilder);
      let response;
      try {
        response = await api.post(`tests/create`, {
          body: this.testBuilder
        }).then(r => r.json());
        console.log(response);

        if (response == 'Unauthorized') {
          this.errorMessage = 'Необходимо авторизоваться'
        }
      } catch {
        this.errorMessage = 'Не удалось сделать запрос к базе данных.';
      }
    }
  },
  async created() {
    let response;

    try {
      response = await api.get(`vacancies`).then(r => r.json());
      console.log(response);

      if (response == 'Unauthorized') {
        this.errorMessage = 'Необходимо авторизоваться'
      } else {
        this.vacancies = response;
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
    padding-bottom: 10px;
    border-bottom: 1px solid;
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
    position: relative;
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
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d8a462;
    padding: 10px;
    color: #7c6d85;
    cursor: text;
    border-radius: 2px;
  }

  .answer-add {
    justify-content: center;
    cursor: pointer;
  }

  .answer__button {
    cursor: pointer;
    height: 100%;
    width: 20px;
    text-align: center;
  }

  .question__answer.correct {
    background: #7c6d85;
    color: #d8a462;
  }

  .question__answer.selected {
    background-color: #d8a462;
    color: #fff;
  }

  input {
    border: none;
    outline: none;
    text-align: center;
    background: inherit;
    color: inherit;
    width: 100%;
    height: 100%;
  }

  input::placeholder {
    color: #d8a462;
    font-style: italic;
  }

  input:focus::-webkit-input-placeholder {
    color:transparent;
  }

  .answer__text {
    flex-grow: 1;
  }

  .question-add {
    border: 1px solid;
    cursor: pointer;
    padding: 5px;
    border-radius: 2px;
    margin: 5px 0;
  }

  .question-delete {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  .answer__info {
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #d8a462;
  }

  .test-create {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d8a462;
    padding: 10px;
    background: #7c6d85;
    color: #d8a462;
    cursor: text;
    border-radius: 2px;
    cursor: pointer;
    width: 40%
  }

  .test__vacancy {
    margin: 20px;
    display: flex;
    align-items: center;
  }

  .vacancy__header {
    color: #7c6d85;
    margin-right: 10px
  }

  #vacancies-input {
    width: 200px;
    outline: none;
    border: 1px solid #7c6d85;
    text-align: left;
    padding: 4px;
    border-radius: 2px;
  }

</style>
