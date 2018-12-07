let speechOutput;
let reprompt;
let welcomeOutput = "Benvenuti in questa skill";
let welcomeReprompt = "Chiedimi qualcosa";
// 2. Skill Code =======================================================================================================
"use strict";
const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
speechOutput = '';
const data = [

    'Se Mario fosse stato una persona reale, avrebbe dovuto correre più di 60 chilometri in Super Mario Bros.',
    'Il creatore di Super Mario Bros e Donkey Kong non è autorizzato a recarsi a lavoro in bici, poiché, per Nintendo, la sua sicurezza è troppo importante',
    'Kirby, personaggio dell omonimo gioco, fu chiamato così grazie a John Kirby, consulente legale della Nintendo che li aiutò in una causa contro gli Universal Studios nel 1982',
    'Ghostbusters: il videogame, fu doppiato da tutti e quattro gli attori del film che aiutarono anche nella scrittura. Dan Aykroyd lo considera un sequel del secondo film .',
    'Nel 2005, un glitch nel gioco World of Warcraft permise ad un epidemia di peste di diffondersi. I giocatori non infetti erano costretti ad abbandonare le città mentre quelli infetti erano obbligati ad una quarantena. Il fenomeno è stato poi studiato da alcuni epidemiologi per capire come le persone reagirebbero ad una pandemia.',
    'Il creatore di Pac-Man non aveva idea di come il gioco finisse, era stato progettato per essere infinito',
    'Ogni volta che Pac-Man mangia una monetina, ferma i suoi movimenti di un frame, rallentando i suoi progressi di circa il 10%, quanto basta per il successivo fantasma per raggiungerlo ',
    'PETA, nota associazione animalista, ebbe da ridire sulle battute di caccia alle balene presenti nel gioco Assassins Creed Black Flag. Ubisoft respinse le accuse dicendo di non approvare la caccia, ne lo stile di vita dei pirati.',
    'Grand Theft Auto era originariamente un gioco di corse chiamato Race and Chase tuttavia, un glitch fece sì che le auto della polizia iniziassero ad impazzire, investendo i pedoni. La cosa ebbe così tanto successo che gli sviluppatori ricostruiirono il gioco basandosi su questo',
];

const handlers = {
	'LaunchRequest': function () {
		this.emit(':ask', welcomeOutput, welcomeReprompt);
	},
	'AMAZON.HelpIntent': function () {
		speechOutput = 'Chiedimi una notizia random sui videogiochi.';
		reprompt = 'Dai, chiedimi!';
		this.emit(':ask', speechOutput, reprompt);
	},
   'AMAZON.CancelIntent': function () {
		speechOutput = 'Ok, cancello';
		this.emit(':tell', speechOutput);
	},
   'AMAZON.StopIntent': function () {
		speechOutput = 'Ok, Buona giornata.';
		this.emit(':tell', speechOutput);
   },
   'SessionEndedRequest': function () {
		speechOutput = '';
		this.emit(':tell', speechOutput);
   },
   // amazon spot
	'AMAZON.NavigateHomeIntent': function () {
		speechOutput = '';
        //Your custom intent handling goes here
		speechOutput = "This is a place holder response for the intent named AMAZON.NavigateHomeIntent. This intent has no slots. Anything else?";
		this.emit(":ask", speechOutput, speechOutput);
    },
	'randomIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random()* factArr.length);
        const randomFact = factArr[factIndex];
		speechOutput = randomFact;
		this.emit(":ask", speechOutput, speechOutput);
    },	
	'Unhandled': function () {
        speechOutput = "Non ho capito. Puoi ripetermelo in parole migliori?";
        this.emit(':ask', speechOutput, speechOutput);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


function resolveCanonical(slot){
	let canonical;
    try{
		canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
	}catch(err){
	    console.log(err.message);
	    canonical = slot.value;
	};
	return canonical;
};

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
	  let updatedIntent= null;
	  if(this.isOverridden()) {
			return;
		}
		this.handler.response = buildSpeechletResponse({
			sessionAttributes: this.attributes,
			directives: getDialogDirectives('Dialog.Delegate', updatedIntent, null),
			shouldEndSession: false
		});
		this.emit(':responseReady', updatedIntent);
		
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
		if(this.isOverridden()) {
			return;
		}
		this.handler.response = buildSpeechletResponse({
			sessionAttributes: this.attributes,
			directives: getDialogDirectives('Dialog.Delegate', null, null),
			shouldEndSession: false
		});
		this.emit(':responseReady');
		
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      return this.event.request.intent;
    }
}


function randomPhrase(array) {
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
function isSlotValid(request, slotName){
        let slot = request.intent.slots[slotName];
        let slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}

function createSpeechObject(optionsParam) {
    if (optionsParam && optionsParam.type === 'SSML') {
        return {
            type: optionsParam.type,
            ssml: optionsParam['speech']
        };
    } else {
        return {
            type: optionsParam.type || 'PlainText',
            text: optionsParam['speech'] || optionsParam
        };
    }
}

function buildSpeechletResponse(options) {
    let alexaResponse = {
        shouldEndSession: options.shouldEndSession
    };

    if (options.output) {
        alexaResponse.outputSpeech = createSpeechObject(options.output);
    }

    if (options.reprompt) {
        alexaResponse.reprompt = {
            outputSpeech: createSpeechObject(options.reprompt)
        };
    }

    if (options.directives) {
        alexaResponse.directives = options.directives;
    }

    if (options.cardTitle && options.cardContent) {
        alexaResponse.card = {
            type: 'Simple',
            title: options.cardTitle,
            content: options.cardContent
        };

        if(options.cardImage && (options.cardImage.smallImageUrl || options.cardImage.largeImageUrl)) {
            alexaResponse.card.type = 'Standard';
            alexaResponse.card['image'] = {};

            delete alexaResponse.card.content;
            alexaResponse.card.text = options.cardContent;

            if(options.cardImage.smallImageUrl) {
                alexaResponse.card.image['smallImageUrl'] = options.cardImage.smallImageUrl;
            }

            if(options.cardImage.largeImageUrl) {
                alexaResponse.card.image['largeImageUrl'] = options.cardImage.largeImageUrl;
            }
        }
    } else if (options.cardType === 'LinkAccount') {
        alexaResponse.card = {
            type: 'LinkAccount'
        };
    } else if (options.cardType === 'AskForPermissionsConsent') {
        alexaResponse.card = {
            type: 'AskForPermissionsConsent',
            permissions: options.permissions
        };
    }

    let returnResult = {
        version: '1.0',
        response: alexaResponse
    };

    if (options.sessionAttributes) {
        returnResult.sessionAttributes = options.sessionAttributes;
    }
    return returnResult;
}

function getDialogDirectives(dialogType, updatedIntent, slotName) {
    let directive = {
        type: dialogType
    };

    if (dialogType === 'Dialog.ElicitSlot') {
        directive.slotToElicit = slotName;
    } else if (dialogType === 'Dialog.ConfirmSlot') {
        directive.slotToConfirm = slotName;
    }

    if (updatedIntent) {
        directive.updatedIntent = updatedIntent;
    }
    return [directive];
}