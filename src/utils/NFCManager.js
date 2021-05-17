import NfcManager, {NfcTech, Ndef, NfcEvents} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
async function initNfc() {
  await NfcManager.start();
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

  try {
    // Step 1
    await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: 'Ready to write some NDEF',
    });

    const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);

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