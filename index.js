const Alexa = require('alexa-sdk');
var anagramica = require('anagramica');
/*var https = require('https');
var options = {
    host: 'anagramica.com',
    port: 443,
    path: "/best/",
    method: 'GET'
};*/

const words_stable = ["study", "ocean", "resistance", "silent", "death", "creative", "slit", "march","meals",
                    "melon","ought","quite","scare","lasts","turns","lured","swipe","thing","unite","trout","verse","waist","wraps",
                    "braved","sauces","comics","shaded","leader","friend","refill","fringe","itself","points","plates","bombed",
                    "meteor","ransom","dimple","skiers","insect","sleuth","rescue","senator","notices","slipper","reverse","kitchen",
                    "slivers","license","mutilate","stealing","cheat","vetoed","seaside","markers","eager","brief","exits","rider","dozen",
                    "shoes","times","fired","strain","pills","stakes","agrees","repaint","nameless","roasting","break","framer","snail",
                    "steam","flier","decree","pronto","potion","stop","repaid","resin","ripens","denser","trial","states","battle","sister",
                    "luring","rustic","sacred","escort","sublet","fries","large","shall","skill","early","sleek","lapse","crate","admirer",
                    "parsley","angered","paternal","sadder"];

var words = words_stable.slice()
var word_index = -1;
var word = "";
var replay = false;

const congrats_phrases = ["Congratulations! You're an Anagram Mastermind!", "Nice job!", "You're amazing at anagrams!", 
                            "Amazing!", "Awesome!", "You're a genius!", "Great thinking!"]

const sorry_phrases = ["Sorry, that doesn't seem right.", "Keep at it!", "Try again", "Keep persevering", "Continue thinking!",
                        "You're close!"]

const handlers = {
    'LaunchRequest': function () {
        this.emit('PlayGameIntent');
    },

    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },

    'Unhandled': function () {
        // This occurs if there is no state defined.
        this.emit(':ask', "HelpMessage", "HelpMessage");
    },

    'PlayGameIntent': function(){
        if(words.length === 0){
            words = words_stable.slice();
        }
        word_index = Math.floor(Math.random()*words.length);
        word = words[word_index];
        words.splice(word_index,1);
        this.emit(':ask', "Let's begin! Your word is " + word, "Take your time.");

    },
    'AMAZON.YesIntent': function(){
        if(replay){
            this.emit("PlayGameIntent");
            replay = false;
        }
        else{
            this.emit(':ask', sorry_phrases[Math.floor(Math.random()*sorry_phrases.length)], "Keep trying!");
        }
    },
    'AMAZON.NoIntent': function(){
        if(replay){
            this.emit(":tell", "Goodbye!");
            replay = false;
        }
        else{
            this.emit(':ask', sorry_phrases[Math.floor(Math.random()*sorry_phrases.length)], "Keep trying!");
        }
    },
    'GuessIntent': function(){
        var superthis = this;
        if(word_index === -1){
            superthis.response.listen("Please start a game to play!");
        }
        else{
            var guess = superthis.event.request.intent.slots.Guess.value;
            console.log(guess);

            anagramica.best(word, function(error, response){
                if(error){
                    console.log(error);
                    throw error;
                }
                var solutions = response["best"];

                console.log(solutions);

                if(solutions.includes(guess) && guess !== word){
                    console.log("Congrats!");
                    replay = true;
                    superthis.emit(':ask', congrats_phrases[Math.floor(Math.random()*congrats_phrases.length)] + " Play again?", "Play again?");
                }
                else{
                    console.log("Try again");
                    superthis.emit(':ask', sorry_phrases[Math.floor(Math.random()*sorry_phrases.length)], "Keep trying!");
                }

            });
        }
    }
    
};

exports.handler = (event, context, callback) => {
    //creates and sets up alexa object
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = "amzn1.ask.skill.7937bb0c-bcb9-43d4-8450-4e7d59ffee83";
    alexa.registerHandlers(handlers);
    alexa.execute();
};