let speechOutput;
let reprompt;
let welcomeOutput = "Benvenuti in questa skill, puoi dirmi: parlami dei videogiochi, oppure, raccontami qualcosa";
let welcomeReprompt = "Chiedimi qualcosa";
// 2. Skill Code =======================================================================================================
"use strict";
const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.5e192b29-462c-4368-84ea-85bc8fd32fc5';  // TODO replace with your app ID (OPTIONAL).
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
    'In corea del sud, per i ragazzi di età inferiore ai sedici anni, è illegale giocare ai videogiochi dopo mezzanotte',
    'La parola Nintendo, tradotta in italiano, significherebbe: la fortuna cade dal cielo',
    'Recenti studi hanno confermato che chi gioca ai videogiochi non può più avere sogni lucidi (ovvero quei sogni dove si ha il pieno controllo di se stessi)',
    'Alcuni storici incolparono l Atari per la grande crisi del videogioco del 1983. Atari ritenne, ormai, che il mercato fosse irrecuperabile e si dedicò alla produzione di progetti senza pretese, come il videogioco del cubo di Rubik',
    'Il creatore di Dragon Slayer, si è ispirato alla rivista Playboy per creare la principessa',
    'È calcolato che fino al 2011, il tempo trascorso da tutti i giocatori in World of Warcraft, è di, soli, 5,93 milioni di anni',
    'Il 256esimo livello di pacman è ingiocabile a causa di un bug',
    'Alcuni studi hanno stabilito che giocare ai videogiochi action, alleni a prendere più rapidamente decisioni nella vita reale; con più lucidità e precisione. I videogiocatori sono dunque più abituati al multitasking',
    'Ostro, personaggio che spara uova dalla proboscide, viene descritto nel manuale di Super Mario 2 in queste parole: pensa di essere una ragazza e sputa uova dalla sua bocca',
    'Nel 2011, in Inghilterra, un uomo di 46 anni risalì ad un ragazzino di 13 anni che lo uccideva troppe volte in Call of Duty, andando a picchiarlo sotto casa sua',
    'Il famoso gioco Candy Crush, secondo alcuni esperti, sfrutterebbe gli stessi meccanismi mentali della dipendenza dal gioco d azzardo',
    'Sono serviti più di 1000 attori per la creazione dei personaggi non giocanti di Red Dead Redemption 2',
    'In Red Dead Redemption 2, si dice esista una città infestata di nome Tumbleweed, nota per i frequenti avvistamenti di spettri e per i rumori sospetti, che provengono dalla villa sulla collina che sovrasta questo luogo ormai disabitato',
    'Fortnite, secondo i dati pubblicati da Recode, ha superato tutti i precedenti record di incassi sul mese singolo, superando videogame come Pokemon Go e League of Legend. Fortnite ha infatti incassato la bellezza di 318,3 milioni di dollari nel solo mese di maggio del 2018',
    'Il gioco Mortal Kombat 2, era così popolare e giocatissimo nelle sale giochi, che alcuni cabinati furono dotati di sistemi di sicurezza antiscasso che impedissero di rubare la scheda madre del gioco, cosa già avvenuta prima di allora',
    'La Eido, che produsse il primo Tomb Rider, voleva introdurre un cheat nel gioco che permettesse di denudare la protagonista, tuttavia il designer Toby Gard non lo consentì',
    'L ordine degli assassini in Assassins Creed è ispirato ad un ordine relamente esistito tra l undicesimo ed il dodicesimo secolo, in Persia ed in Siria',
    'Robbie Williams, famoso cantante appassionato di videogiochi, chiamò i suoi figli come i personaggi dei videogiochi che adorava: Zelda, da The Legend of Zelda. E Cody, da Final Fight',
    'In Brasile, i videogiochi sono tassati del 120% perché una vecchia legge li mette al pari del gioco d azzardo',
    'Il boo della serie di Super Mario, fantasmino che fa finta di nulla quando Mario lo guarda, e si avvicina con fare minaccioso quando lo ignora, è basato sulla moglie sgorbutica del programmatore Nintendo, Takashi Tezuka',
    'Un gruppo di giocatori di Minecraft, sta lavorando tutt oggi con passione per ricreare alla perfezione la terra di mezzo de Il signore degli anelli'

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
		//this.emit(':saveState',true);//uncomment to save attributes to db on session end
		this.emit(':tell', speechOutput);
   },
	'AMAZON.NavigateHomeIntent': function () {
		speechOutput = '';

		//any intent slot variables are listed here for convenience


		//Your custom intent handling goes here
		speechOutput = "This is a place holder response for the intent named AMAZON.NavigateHomeIntent. This intent has no slots. Anything else?";
		this.emit(":ask", speechOutput, speechOutput);
    },
	'randomIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random()* factArr.length);
        const randomFact = factArr[factIndex];
		speechOutput = randomFact;
		this.emit(":tell", speechOutput, speechOutput);
		shouldEndSession: true
    },	
	'Unhandled': function () {
        speechOutput = "Non ho capito. Puoi ripetermelo in parole migliori?";
        this.emit(':ask', speechOutput, speechOutput);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
	//alexa.dynamoDBTableName = 'DYNAMODB_TABLE_NAME'; //uncomment this line to save attributes to DB
    alexa.execute();
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function resolveCanonical(slot){
	//this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
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
	  // updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      //this.emit(":delegate", updatedIntent); //uncomment this is using ASK SDK 1.0.9 or newer
	  
	  //this code is necessary if using ASK SDK versions prior to 1.0.9 
	  if(this.isOverridden()) {
			return;
		}
		this.handler.response = buildSpeechletResponse({
			sessionAttributes: this.attributes,
			directives: getDialogDirectives('Dialog.Delegate', updatedIntent, null),
			shouldEndSession: true
		});
		this.emit(':responseReady', updatedIntent);
		
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      //this.emit(":delegate"); //uncomment this is using ASK SDK 1.0.9 or newer
	  
	  //this code necessary is using ASK SDK versions prior to 1.0.9
		if(this.isOverridden()) {
			return;
		}
		this.handler.response = buildSpeechletResponse({
			sessionAttributes: this.attributes,
			directives: getDialogDirectives('Dialog.Delegate', null, null),
			shouldEndSession: true
		});
		this.emit(':responseReady');
		
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}

function isSlotValid(request, slotName){
        let slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
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

//These functions are here to allow dialog directives to work with SDK versions prior to 1.0.9
//will be removed once Lambda templates are updated with the latest SDK

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