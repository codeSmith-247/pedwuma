import React, { useState, useEffect } from 'react';
import { Loading } from './';
import { create, read } from '../databank';
import { useLocation } from "react-router-dom";

function Translate() {
  const [isFrench, setIsFrench] = useState(false);
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    translateAllElements();
  }, [isFrench, pathname]);

  const translateToFrench = (text, callback) => {
    // setIsFrench(!isFrench);
    fetch(`https://translation.googleapis.com/language/translate/v2?key=${'AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: read.getItem('lang') == 'fr' ? 'en' : 'fr',
        target: read.getItem('lang') == 'fr' ? 'fr' : 'en',
      }),
    })
    .then(response => response.json())
    .then(data => {
      const translatedText = data.data.translations[0].translatedText;
      callback(translatedText);
    })
    .catch(error => {
      console.error('Translation error:', error);
    });
  };

  const translateElement = (element) => {
    if (element.nodeType === Node.TEXT_NODE) {
      translateToFrench(element.textContent, translatedText => {
        element.textContent = translatedText.replaceAll("&#39;", "'");
      });
    } else if (element.nodeType === Node.ELEMENT_NODE) {
      element.childNodes.forEach(childNode => {
        translateElement(childNode);
      });
    }
  };

  const translateAllElements = () => {
    setLoading(true);

    if(read.getItem('lang') == 'en') {
      
      if(read.getItem('ooo') == 'ooo') {
        create.setItem('ooo', '000');
        location.reload();
      }

      setLoading(false);
      return false;
    }
    else {
      create.setItem('ooo', 'ooo');
    }
    
    const elementsToTranslate = document.querySelectorAll('body');

    let size = elementsToTranslate.length;

    for(let i = 0; i < size; i++) {
        let element = elementsToTranslate[i];
        translateElement(element);
    }

    setLoading(false);
  };

  return (
    <>
        <Loading load={loading}/>
        <div className="flex items-center h-0 w-0 overflow-hidden opacity-0">
            <div className="to-english" onClick={() => { create.setItem('lang', 'en'); setIsFrench(false); console.log('clicked eng')}} value="en">English</div>
            <div className="to-french" onClick={() => { create.setItem('lang', 'fr'); setIsFrench(true); console.log('clicked fre')}} value="fr">French</div>
        </div>
    </>
  );
}

export default Translate;
