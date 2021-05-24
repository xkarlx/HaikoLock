import NfcManager, {NfcTech, Ndef, NfcEvents} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
async function initNfc() {
  await NfcManager.start();
}

function tagToByteList(){



}

function readNdef() {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };
  
    return new Promise((resolve) => {
      let tagFound = null;
  
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        
        var bytes=tag.id.match(/.{1,2}/g).map(element=>parseInt("0x"+element))
        console.log(Ndef.decodeMessage(bytes),bytes)
        console.log(Ndef.decodeMessage([1]))
        resolve(tagFound);
        if (Platform.OS === 'ios') {
            NfcManager.setAlertMessageIOS('NDEF tag found');
        }
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
  
      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });
  
      NfcManager.registerTagEvent();
    });
  }

async function writeNdef({type, value}) {
  let result = false;
  console.log("test started")
  try {
    // Step 1
    await NfcManager.requestTechnology([NfcTech.NfcA,NfcTech.Ndef, NfcTech.IsoDep], {
      alertMessage: 'Ready to write some NDEF',
    });
    console.log("step 1 finished")

    const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);
    console.log(bytes)
    if (bytes) {
      await NfcManager.ndefHandler // Step2
        .writeNdefMessage(bytes); // Step3

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Successfully write NDEF');
      }
    }

    result = true;
  } catch (ex) {
    console.warn(ex);
  }

  // Step 4
  NfcManager.cancelTechnologyRequest().catch(() => 0);
  return result;
}

export async function readNFCAction(){
  var result;
  await initNfc().then(
      res => readNdef().then(res => {result =res  })
  )
  return result;
}

export async function writeNFCAction(){
  var result;
  
    await initNfc().then(
        res => {
          writeNdef({type:"",value:""}).then(res => {result =res; console.log(res)  }).catch(err=>console.log(err))
        })
    
    return result;
}