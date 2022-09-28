import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';

export default class Quiz extends Component {

    // initiating the local state
    state = {
        quiestions: {
            1: 'Virtual tarmoq hosil qilib beruvchi dasturlarni ko`rsating.',
            2: 'ISO Open Systems Interconnection (OSI) modeli qachon ishlab chiqilgan?',
            3: 'Kompyuter tarmoq topologiyasi keltirilgan bandni belgilang.',
            4: '120000 namuna/sek * 7 bit/namuna = ...... ?'
        },
        answers: {
            1: {
                1: 'VMware NSX, Cisco ACI, Cisco Enterprise Network Functions Virtualization, Masergy, Cisco Elastic Services Controller, Sangfor aBOS',
                2: 'VMware NSX, Cisco ACI, VMware, Masergy, AWS Network, Sangfor aBOS',
                3: 'VMware NSX, Cisco ACI, GoogleCloud Cisco Elastic Services Controller, Azure Bastion',
                4: 'Arista Converged Cloud Fabric (CCF), Masergy, Cisco Elastic Services Controller, Sangfor aBOS, Azure Net'
            },
            2: {
                1: '1980-yil',
                2: '1970-yil',
                3: '1984-yil',
                4: '1990-yil'
            },
            3: {
                1: 'Aralash, Chiziqli, Doiraviy, Daraxtsimon, Shinali',
                2: 'Shinali, Yulduzsimon, Halqasimon, Daraxtsimon, Aralash',
                3: 'Chiziqli, Daraxtsimon, Aralash',
                4: 'Shinali, Daraxtsimon, Halqasimon, Aralash'
            },
            4: {
                1: '84 Mbit/s',
                2: '84 Kbit/s',
                3: '840 Bit/s',
                4: '840 Kbit/s'
            }
        },
        correctAnswers: {
            1: '1',
            2: '3',
            3: '2',
            4: '4',
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        return(
            <div className="Content">
                {step <= Object.keys(quiestions).length ? 
                    (<>
                        <Question
                            question={quiestions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(quiestions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(quiestions).length}</p>
                            <p>Thank you!</p>
                        </div>
                    )
                }
            </div>
        );
    }
}