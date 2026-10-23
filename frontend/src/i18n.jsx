import { useCallback, useEffect, useState } from 'react';
import { LanguageContext } from './languageContext';

const hindiTranslations = {
  'Main navigation': 'मुख्य नेविगेशन',
  'AgriGrade home': 'AgriGrade होम',
  'How it works': 'यह कैसे काम करता है',
  'Check a crop': 'फसल की जाँच करें',
  'Switch language': 'भाषा बदलें',
  'English': 'अंग्रेज़ी',
  'Hindi': 'हिन्दी',
  'EXPLORE': 'जानें',
  'Crop check': 'फसल जाँच',
  'AgriGrade — Automated Crop Quality Assessment': 'AgriGrade — फसल की गुणवत्ता का स्वचालित आकलन',
  'AI-powered crop disease detection, severity grading, weather insights, and market prices for modern farmers.':
    'आधुनिक किसानों के लिए AI आधारित फसल रोग पहचान, गंभीरता का आकलन, मौसम की जानकारी और मंडी भाव।',
  'Detect crop diseases, assess severity, and discover smarter ways to protect your harvest with AgriGrade\'s AI-powered crop analysis platform.':
    'AgriGrade के AI आधारित फसल विश्लेषण से रोग पहचानें, गंभीरता का आकलन करें और पैदावार की बेहतर सुरक्षा के तरीके जानें।',
  'GET IN TOUCH': 'संपर्क करें',
  'Built for growers, everywhere': 'हर जगह के किसानों के लिए',
  'Clearer crop insights for healthier harvests. Designed to make a useful first check feel simple.':
    'बेहतर फसल और स्वस्थ पैदावार के लिए स्पष्ट जानकारी। फसल की शुरुआती जाँच को आसान बनाने के लिए।',
  'AI predictions are a helpful starting point, not a substitute for professional agronomic advice.':
    'AI का अनुमान शुरुआती जानकारी है; यह कृषि विशेषज्ञ की सलाह का विकल्प नहीं है।',
  'A HEALTHIER HARVEST STARTS HERE': 'बेहतर पैदावार की शुरुआत यहाँ से',
  'Where nature meets': 'जहाँ प्रकृति से मिलता है',
  'healthier harvests.': 'बेहतर पैदावार का रास्ता।',
  'Check crop health, learn what to look for, and get practical ideas to help care for your field.':
    'फसल की सेहत जाँचें, लक्षण पहचानें और खेत की देखभाल के लिए उपयोगी सुझाव पाएँ।',
  'Check your crop': 'अपनी फसल जाँचें',
  'We\'re here to make crop health checks clearer, calmer, and more useful for every grower.':
    'हम फसल की सेहत की जाँच को हर किसान के लिए अधिक स्पष्ट, सहज और उपयोगी बनाना चाहते हैं।',
  'Practical guidance': 'काम के सुझाव',
  'Simple steps for your next field check': 'खेत की अगली जाँच के लिए आसान तरीके',
  'Photo-first checks': 'फोटो से फसल जाँच',
  'Start with a crop photo, right here': 'यहीं अपनी फसल की फोटो से शुरुआत करें',
  'AgriGrade highlights': 'AgriGrade की खास बातें',
  "We're here to make crop health checks": 'हम फसल की सेहत की जाँच को',
  'clearer, calmer, and more useful': 'अधिक स्पष्ट, सहज और उपयोगी',
  'for every grower.': 'हर किसान के लिए बेहतर बनाना चाहते हैं।',
  'SIMPLE STEPS, USEFUL INSIGHTS': 'आसान तरीके, उपयोगी जानकारी',
  'From a field photo to a clearer next step.': 'खेत की फोटो से आगे का सही कदम समझें।',
  'Easy to follow, with no complicated reports or hard-to-read charts.':
    'आसान जानकारी—न मुश्किल रिपोर्ट, न उलझाने वाले चार्ट।',
  'Take a crop photo': 'फसल की फोटो लें',
  'Choose a clear photo of the leaf, fruit, or stem you want to check.':
    'जिस पत्ती, फल या तने की जाँच करनी है, उसकी साफ़ फोटो चुनें।',
  'See what to look for': 'लक्षणों को समझें',
  'Review the model prediction, available severity details, and crop-care suggestions.':
    'मॉडल का अनुमान, उपलब्ध गंभीरता की जानकारी और फसल देखभाल के सुझाव देखें।',
  'Choose your next step': 'अगला कदम चुनें',
  'Use the information as a starting point for checking with a local agriculture expert.':
    'इस जानकारी के आधार पर स्थानीय कृषि विशेषज्ञ से सलाह लें।',
  'Analyze another crop': 'दूसरी फसल की जाँच करें',
  'YOUR CROP CHECK': 'आपकी फसल की जाँच',
  'A closer look starts with one photo.': 'एक फोटो से फसल को बेहतर समझें।',
  'Upload a clear crop photo to get an AI-powered health assessment and practical care suggestions.':
    'AI से फसल की सेहत का अनुमान और देखभाल के उपयोगी सुझाव पाने के लिए साफ़ फोटो अपलोड करें।',
  'Clear, step-by-step results': 'आसान और क्रमवार नतीजे',
  'Crop health and severity overview': 'फसल की सेहत और गंभीरता की जानकारी',
  'Actionable care suggestions': 'काम में आने वाले देखभाल सुझाव',
  'Upload crop photo': 'फसल की फोटो अपलोड करें',
  'JPG, PNG or WebP · up to 10 MB': 'JPG, PNG या WebP · अधिकतम 10 MB',
  'Drag a photo here': 'फोटो यहाँ खींचकर छोड़ें',
  'or ': 'या ',
  'browse files': 'फ़ाइलें चुनें',
  ' on your device': ' अपने डिवाइस से',
  'For best results, use a well-lit close-up photo': 'बेहतर नतीजों के लिए अच्छी रोशनी में पास से फोटो लें',
  'Remove selected image': 'चुनी हुई फोटो हटाएँ',
  'Analyze crop': 'फसल का विश्लेषण करें',
  'Analyzing crop...': 'फसल का विश्लेषण हो रहा है...',
  'Your photo is analyzed by the AgriGrade crop health service.':
    'आपकी फोटो का विश्लेषण AgriGrade की फसल-सेहत सेवा करती है।',
  'Please select a JPG, PNG, or WEBP image.': 'कृपया JPG, PNG या WEBP फोटो चुनें।',
  'Image size must not exceed 10 MB.': 'फोटो का आकार 10 MB से अधिक नहीं होना चाहिए।',
  'Could not read the selected image.': 'चुनी हुई फोटो पढ़ी नहीं जा सकी।',
  'Cannot connect to the backend. Start FastAPI on port 8000 and check the API URL.':
    'बैकएंड से कनेक्शन नहीं हो सका। FastAPI को पोर्ट 8000 पर चालू करके API URL जाँचें।',
  'The backend returned an invalid response. Check the backend terminal.':
    'बैकएंड से गलत जवाब मिला। बैकएंड टर्मिनल जाँचें।',
  'Crop analysis failed. Please try again.': 'फसल का विश्लेषण नहीं हो सका। फिर कोशिश करें।',
  'The AI model did not return a valid crop prediction.':
    'AI मॉडल से फसल का सही अनुमान नहीं मिला।',
  'Unsupported image format. Upload JPG, PNG, or WEBP.':
    'फोटो का फ़ॉर्मैट समर्थित नहीं है। JPG, PNG या WEBP अपलोड करें।',
  'Uploaded image is empty.': 'अपलोड की गई फोटो खाली है।',
  'Image is too large. Maximum allowed size is 10 MB.':
    'फोटो बहुत बड़ी है। अधिकतम आकार 10 MB है।',
  'This image does not appear to contain a supported crop leaf.':
    'इस फोटो में समर्थित फसल की पत्ती नहीं दिख रही है।',
  'This is a preliminary model prediction, not a confirmed field diagnosis.':
    'यह मॉडल का शुरुआती अनुमान है, खेत में बीमारी की पुष्टि नहीं।',
  'Unable to analyze the crop image.': 'फसल की फोटो का विश्लेषण नहीं हो सका।',
  'Loading current mandi prices…': 'मंडी के ताज़ा भाव लोड हो रहे हैं…',
  'Market prices could not be loaded.': 'मंडी के भाव लोड नहीं हो सके।',
  'Market API request timed out.': 'मंडी के भाव का अनुरोध समय-सीमा में पूरा नहीं हुआ।',
  'Government market API key is not configured.': 'सरकारी मंडी API की कुंजी सेट नहीं है।',
  'Government market API returned an HTTP error.': 'सरकारी मंडी API से त्रुटि मिली।',
  'Government market API key is invalid or unauthorized.': 'सरकारी मंडी API की कुंजी गलत है या अनुमति नहीं है।',
  'Market prices are not currently available.': 'मंडी के भाव अभी उपलब्ध नहीं हैं।',
  'LOCAL MARKET SNAPSHOT': 'स्थानीय मंडी भाव',
  'Government mandi data': 'सरकारी मंडी डेटा',
  'No current mandi prices were found for {cropName}.':
    '{cropName} के लिए अभी मंडी भाव नहीं मिले।',
  'Prices are supplied by the Government of India Open Government Data service when available.':
    'भाव भारत सरकार की ओपन गवर्नमेंट डेटा सेवा से उपलब्ध होने पर दिखाए जाते हैं।',
  'INR per quintal.': 'रुपये प्रति क्विंटल।',
  'Prices are from the Government of India Open Government Data service, {priceUnit} Confirm local rates before making sales decisions.':
    'भाव भारत सरकार की ओपन गवर्नमेंट डेटा सेवा से हैं ({priceUnit})। बिक्री से पहले स्थानीय भाव की पुष्टि करें।',
  'OPTIONAL GROSS-REVENUE ESTIMATE': 'वैकल्पिक सकल कमाई का अनुमान',
  'What if your crop recovers?': 'अगर फसल स्वस्थ हो जाए तो?',
  'Enter your own yield estimates to compare current and healthy-crop scenarios at the selected mandi rate.':
    'चुनी हुई मंडी दर पर मौजूदा और स्वस्थ फसल की कमाई की तुलना के लिए अपनी उपज का अनुमान भरें।',
  'Farm area (acres)': 'खेत का क्षेत्रफल (एकड़)',
  'Current expected yield (quintals/acre)': 'अभी अनुमानित उपज (क्विंटल/एकड़)',
  'Expected healthy yield (quintals/acre)': 'स्वस्थ फसल की अनुमानित उपज (क्विंटल/एकड़)',
  'Gross revenue at current yield': 'मौजूदा उपज पर कुल कमाई',
  'Gross revenue at healthy yield': 'स्वस्थ उपज पर कुल कमाई',
  'Gross-revenue difference': 'कुल कमाई का अंतर',
  'Estimated yield change': 'अनुमानित उपज में बदलाव',
  'Estimate uses the selected mandi modal price and your yield inputs. It is not a profit forecast or guaranteed outcome; growing costs, actual yield and future prices can change the result.':
    'यह अनुमान चुनी हुई मंडी की औसत दर और आपकी उपज की जानकारी पर आधारित है। यह मुनाफ़े की गारंटी नहीं है; खेती की लागत, वास्तविक उपज और भविष्य के भाव से नतीजा बदल सकता है।',
  'Add all three inputs and select an available mandi rate to see an estimate. The AI prediction does not estimate crop yield.':
    'अनुमान देखने के लिए तीनों जानकारी भरें और उपलब्ध मंडी भाव चुनें। AI अनुमान फसल की उपज नहीं बताता।',
  'Enter a city to check local weather.': 'स्थानीय मौसम देखने के लिए शहर का नाम भरें।',
  'Weather information could not be loaded.': 'मौसम की जानकारी लोड नहीं हो सकी।',
  'Weather information is not currently available.': 'मौसम की जानकारी अभी उपलब्ध नहीं है।',
  'Weather API key is not configured.': 'मौसम API की कुंजी सेट नहीं है।',
  'Weather API key is invalid, inactive, or not authorized.': 'मौसम API की कुंजी गलत, निष्क्रिय या अनधिकृत है।',
  'Weather provider returned incomplete data.': 'मौसम सेवा से अधूरी जानकारी मिली।',
  'City not found.': 'शहर नहीं मिला।',
  'Weather request timed out.': 'मौसम का अनुरोध समय-सीमा में पूरा नहीं हुआ।',
  'Weather provider returned an error.': 'मौसम सेवा से त्रुटि मिली।',
  'Unable to connect to the weather provider.': 'मौसम सेवा से कनेक्ट नहीं हो सका।',
  'LOCAL WEATHER CHECK': 'स्थानीय मौसम की जाँच',
  'Weather & crop suggestions': 'मौसम और फसल के सुझाव',
  'Current conditions can highlight risks, but are not a weather forecast or a diagnosis.':
    'मौजूदा मौसम से संभावित जोखिम समझे जा सकते हैं, लेकिन यह मौसम पूर्वानुमान या बीमारी की पुष्टि नहीं है।',
  'City in India': 'भारत का शहर',
  'e.g. New Delhi': 'जैसे: नई दिल्ली',
  'e.g. 2': 'जैसे: 2',
  'e.g. 8': 'जैसे: 8',
  'e.g. 12': 'जैसे: 12',
  'Checking…': 'जाँच हो रही है…',
  'Check weather': 'मौसम जाँचें',
  'Loading current weather…': 'मौजूदा मौसम लोड हो रहा है…',
  'Humidity': 'नमी',
  'Wind': 'हवा',
  'WEATHER-BASED': 'मौसम पर आधारित',
  'What to do': 'क्या करें',
  'PRECAUTIONS': 'सावधानियाँ',
  'What to avoid': 'किन बातों से बचें',
  'Live conditions from OpenWeather. Suggestions are general precautions based on current conditions—not a forecast or guaranteed crop outcome.':
    'OpenWeather से मौजूदा मौसम की जानकारी। सुझाव सामान्य सावधानियाँ हैं—यह पूर्वानुमान या फसल के नतीजे की गारंटी नहीं है।',
  'Inspect {cropName} leaves for new spots or other changes.':
    '{cropName} की पत्तियों पर नए धब्बे या बदलाव देखें।',
  'Avoid wetting foliage while watering; high humidity can slow leaf drying.':
    'सिंचाई के दौरान पत्तियों को भिगोने से बचें; अधिक नमी में पत्तियाँ देर से सूखती हैं।',
  'Check soil moisture around {cropName} before adjusting irrigation.':
    'सिंचाई बदलने से पहले {cropName} के आसपास मिट्टी की नमी जाँचें।',
  'Do not increase watering based on humidity alone; check soil and crop needs first.':
    'केवल हवा की नमी देखकर सिंचाई न बढ़ाएँ; पहले मिट्टी और फसल की ज़रूरत जाँचें।',
  'Check {cropName} for wilting and, if watering is needed, choose cooler hours.':
    '{cropName} में मुरझाने के लक्षण देखें और ज़रूरत हो तो ठंडे समय में सिंचाई करें।',
  'Avoid unnecessary field work during the hottest part of the day.':
    'दिन के सबसे गर्म समय में खेत का गैर-ज़रूरी काम न करें।',
  'Monitor {cropName} for signs of cold stress while temperatures are low.':
    'कम तापमान में {cropName} पर ठंड से नुकसान के लक्षण देखें।',
  'Check that field drains are clear while rain is reported.':
    'बारिश के दौरान खेत की नालियाँ साफ़ हैं या नहीं, जाँचें।',
  'Avoid spraying while it is raining; treatment may wash off.':
    'बारिश में छिड़काव न करें; दवा धुल सकती है।',
  'Support exposed young plants if they are being affected by the wind.':
    'हवा से प्रभावित खुले खेत के छोटे पौधों को सहारा दें।',
  'Avoid spraying in strong winds, which can cause drift.':
    'तेज़ हवा में छिड़काव न करें; दवा दूसरी जगह उड़ सकती है।',
  'Keep monitoring {cropName} and follow your local crop-care guidance. No elevated heat, humidity, or wind threshold was detected in this snapshot.':
    '{cropName} पर नज़र रखें और स्थानीय कृषि सलाह मानें। इस समय तापमान, नमी या हवा का स्तर असामान्य रूप से अधिक नहीं मिला।',
  'Do not make major irrigation or treatment changes based on one weather snapshot alone.':
    'मौसम की एक बार की जानकारी के आधार पर सिंचाई या उपचार में बड़ा बदलाव न करें।',
  'No crop report yet.': 'अभी फसल की रिपोर्ट उपलब्ध नहीं है।',
  'Choose a crop photo first to prepare your assessment.':
    'जाँच शुरू करने के लिए पहले फसल की फोटो चुनें।',
  'Go to crop check': 'फसल की जाँच पर जाएँ',
  'Uploaded crop image: {fileName}': 'अपलोड की गई फसल की फोटो: {fileName}',
  'Uploaded crop image': 'अपलोड की गई फसल की फोटो',
  'No crop image available.': 'फसल की फोटो उपलब्ध नहीं है।',
  'CROP PHOTO': 'फसल की फोटो',
  'CROP HEALTH CHECK': 'फसल की सेहत की जाँच',
  'Crop assessment dashboard': 'फसल आकलन डैशबोर्ड',
  'Uploaded image': 'अपलोड की गई फोटो',
  'Disease regions have not been individually segmented or detected.':
    'बीमारी से प्रभावित हिस्सों की अलग से पहचान नहीं की गई है।',
  'Not assessed': 'जाँच नहीं हुई',
  'Mild': 'हल्का',
  'Moderate': 'मध्यम',
  'Severe': 'गंभीर',
  'Healthy': 'स्वस्थ',
  'Unknown crop': 'अज्ञात फसल',
  'Prediction unavailable': 'अनुमान उपलब्ध नहीं',
  'MODEL PREDICTION': 'मॉडल का अनुमान',
  'Model prediction': 'मॉडल का अनुमान',
  'Here’s your crop overview.': 'आपकी फसल की रिपोर्ट।',
  'Review the model prediction and available guidance. Classification is not a confirmed field diagnosis.':
    'मॉडल का अनुमान और उपलब्ध सुझाव देखें। यह बीमारी की पक्की पुष्टि नहीं है।',
  'Crop report sections': 'फसल रिपोर्ट के अनुभाग',
  'Overview': 'सारांश',
  'Market prices': 'मंडी भाव',
  'Weather': 'मौसम',
  'MODEL CONFIDENCE': 'मॉडल का भरोसा',
  'Confidence unavailable': 'भरोसे का स्तर उपलब्ध नहीं',
  'Model confidence {confidence}%': 'मॉडल का भरोसा {confidence}%',
  'Predicted-class confidence was not provided by the API.':
    'API ने अनुमान का भरोसा स्तर नहीं दिया।',
  'Probability assigned to the predicted crop condition.':
    'फसल की अनुमानित स्थिति की संभावना।',
  'AFFECTED AREA': 'प्रभावित क्षेत्र',
  'Estimated affected leaf area: {percent}%': 'पत्ती का अनुमानित प्रभावित क्षेत्र: {percent}%',
  'Affected leaf area is not available': 'पत्ती का प्रभावित क्षेत्र उपलब्ध नहीं है',
  'Estimated affected leaf area from the trained severity model. This is not a validated physical measurement.':
    'प्रशिक्षित गंभीरता मॉडल से प्रभावित क्षेत्र का अनुमान। यह सत्यापित भौतिक माप नहीं है।',
  'Affected leaf area is not available.': 'पत्ती का प्रभावित क्षेत्र उपलब्ध नहीं है।',
  'FIELD HEALTH': 'फसल की स्थिति',
  'Severity assessment: {severityLevel}': 'गंभीरता का आकलन: {severityLevel}',
  'A validated field-severity assessment is not available.':
    'खेत में गंभीरता का सत्यापित आकलन उपलब्ध नहीं है।',
  'WHAT TO LOOK FOR': 'किन लक्षणों पर ध्यान दें',
  'Symptoms to look for': 'ध्यान देने योग्य लक्षण',
  'No symptom details were supplied by the API. Inspect the affected leaves and consult a local agricultural expert to confirm the symptoms.':
    'API से लक्षणों की जानकारी नहीं मिली। प्रभावित पत्तियाँ देखें और पुष्टि के लिए स्थानीय कृषि विशेषज्ञ से सलाह लें।',
  'PRACTICAL NEXT STEPS': 'काम के अगले कदम',
  'Care suggestions': 'देखभाल के सुझाव',
  'Crop care recommendations': 'फसल की देखभाल के सुझाव',
  'No disease-specific recommendations were returned by the API. Confirm the diagnosis before choosing a treatment.':
    'API से बीमारी-विशेष सुझाव नहीं मिले। उपचार चुनने से पहले बीमारी की पुष्टि करें।',
  'Suggested next step:': 'अगला सुझाया गया कदम:',
  'The estimated affected leaf area is below 20%.': 'पत्ती का अनुमानित प्रभावित क्षेत्र 20% से कम है।',
  'The estimated affected leaf area is at least 20% but below 50%.': 'पत्ती का अनुमानित प्रभावित क्षेत्र 20% या उससे अधिक, लेकिन 50% से कम है।',
  'The estimated affected leaf area is 50% or higher.': 'पत्ती का अनुमानित प्रभावित क्षेत्र 50% या उससे अधिक है।',
  'Affected leaf area has not been estimated.': 'पत्ती का प्रभावित क्षेत्र अनुमानित नहीं किया गया है।',
  'The classifier predicted a healthy leaf.': 'मॉडल ने पत्ती को स्वस्थ बताया है।',
  'Affected area set to 0% for the healthy class.': 'स्वस्थ श्रेणी के लिए प्रभावित क्षेत्र 0% माना गया है।',
  'Disease classification confidence does not measure affected leaf area.': 'बीमारी के अनुमान का भरोसा प्रभावित पत्ती के क्षेत्र का माप नहीं है।',
  'Invalid disease class name.': 'बीमारी की श्रेणी का नाम अमान्य है।',
  'Disease severity has not been established.': 'बीमारी की गंभीरता तय नहीं हुई है।',
  'Monitor the plant and check whether symptoms change.':
    'पौधे पर नज़र रखें और देखें कि लक्षण बदल रहे हैं या नहीं।',
  'Inspect the plant carefully and consider seeking local expert advice.':
    'पौधे की ध्यान से जाँच करें और स्थानीय विशेषज्ञ से सलाह लेने पर विचार करें।',
  'Seek advice from a qualified local agricultural expert promptly.':
    'जल्द ही योग्य स्थानीय कृषि विशेषज्ञ से सलाह लें।',
  'Continue monitoring the plant and maintain good crop care.':
    'पौधे पर नज़र रखें और फसल की अच्छी देखभाल जारी रखें।',
  'Want to check another photo?': 'दूसरी फोटो जाँचना चाहते हैं?',
  'Back to crop check': 'फसल जाँच पर वापस जाएँ',
  'Not measured': 'मापा नहीं गया',
  'Select a crop photo': 'फसल की फोटो चुनें',
  'Selected crop leaf': 'चुनी हुई फसल की पत्ती',
  'Choose a crop photo': 'फसल की फोटो चुनें',
  'Analyzing your crop': 'फसल का विश्लेषण हो रहा है',
  'Analysis progress': 'विश्लेषण की प्रगति',
  '{cropName} prices': '{cropName} के भाव',
  'The model predicted {diseaseName} in {cropName}. Disease-specific information is unavailable.':
    'मॉडल ने {cropName} में {diseaseName} का अनुमान दिया है। इस बीमारी की विशेष जानकारी उपलब्ध नहीं है।',
  'Apple': 'सेब',
  'Blueberry': 'ब्लूबेरी',
  'Cherry (including sour)': 'चेरी',
  'Corn (maize)': 'मक्का',
  'Grape': 'अंगूर',
  'Orange': 'संतरा',
  'Peach': 'आड़ू',
  'Bell pepper': 'शिमला मिर्च',
  'Potato': 'आलू',
  'Raspberry': 'रसभरी',
  'Soybean': 'सोयाबीन',
  'Squash': 'स्क्वैश',
  'Strawberry': 'स्ट्रॉबेरी',
  'Tomato': 'टमाटर',
  'Apple scab': 'सेब का स्कैब रोग',
  'Black rot': 'ब्लैक रॉट',
  'Cedar apple rust': 'सीडर एप्पल रस्ट',
  'Early blight': 'अर्ली ब्लाइट',
  'Late blight': 'लेट ब्लाइट',
  'Leaf mold': 'लीफ मोल्ड',
  'Septoria leaf spot': 'सेप्टोरिया पत्ती धब्बा',
  'Spider mites': 'मकड़ी के माइट',
  'Target spot': 'टार्गेट स्पॉट',
  'Yellow leaf curl virus': 'येलो लीफ कर्ल वायरस',
  'Mosaic virus': 'मोज़ेक वायरस',
  'Bacterial spot': 'बैक्टीरियल स्पॉट',
  'Powdery mildew': 'पाउडरी मिल्ड्यू',
  'Downy mildew': 'डाउनी मिल्ड्यू',
  'Northern leaf blight': 'नॉर्दर्न लीफ ब्लाइट',
  'Common rust': 'कॉमन रस्ट',
  'Cercospora leaf spot': 'सर्कोस्पोरा पत्ती धब्बा',
  'Leaf scorch': 'लीफ स्कॉर्च',
  'Haunglongbing (citrus greening)': 'सिट्रस ग्रीनिंग रोग',
  'Esca (black measles)': 'एस्का (ब्लैक मीज़ल्स)',
  'Leaf blight': 'लीफ ब्लाइट',
  'Leaf spot': 'पत्ती धब्बा',
  'Brown spot': 'भूरा धब्बा',
  'Inspect several leaves for unusual spots, discoloration, wilting, or growth.':
    'कई पत्तियों पर असामान्य धब्बे, रंग बदलना, मुरझाना या वृद्धि में बदलाव देखें।',
  'Check nearby plants and observe whether symptoms are spreading.':
    'पास के पौधों की जाँच करें और देखें कि लक्षण फैल रहे हैं या नहीं।',
  'Consult a local agricultural expert to confirm the cause.':
    'कारण की पुष्टि के लिए स्थानीय कृषि विशेषज्ञ से सलाह लें।',
  'The model classified this tomato leaf as healthy.':
    'मॉडल ने टमाटर की इस पत्ती को स्वस्थ बताया है।',
  'Tomato bacterial spot can affect foliage and fruit, causing small dark lesions.':
    'टमाटर का बैक्टीरियल स्पॉट पत्तियों और फलों पर छोटे गहरे धब्बे बना सकता है।',
  'Look for small dark or water-soaked leaf spots.':
    'पत्तियों पर छोटे गहरे या पानी से भीगे हुए धब्बे देखें।',
  'Inspect fruit for rough or dark spots.':
    'फलों पर खुरदरे या गहरे धब्बे देखें।',
  'Check nearby tomato plants for similar symptoms.':
    'पास के टमाटर के पौधों में भी ऐसे लक्षण देखें।',
  'Use clean planting material.': 'रोपाई के लिए साफ़ और स्वस्थ सामग्री का उपयोग करें।',
  'Avoid unnecessary overhead irrigation.':
    'ऊपर से अनावश्यक सिंचाई करने से बचें।',
  'Confirm bacterial infection before selecting a control measure.':
    'नियंत्रण का तरीका चुनने से पहले बैक्टीरियल संक्रमण की पुष्टि करें।',
  'Tomato early blight is a fungal disease often associated with dark leaf lesions and concentric rings.':
    'टमाटर का अर्ली ब्लाइट एक फफूंद रोग है, जिसमें पत्तियों पर गहरे धब्बे और गोल छल्ले बन सकते हैं।',
  'Look for dark lesions with concentric rings.':
    'गोल छल्लों वाले गहरे धब्बे देखें।',
  'Check older leaves for yellowing around spots.':
    'पुरानी पत्तियों पर धब्बों के आसपास पीलापन देखें।',
  'Monitor whether lower leaves show increasing damage.':
    'देखें कि निचली पत्तियों पर नुकसान बढ़ तो नहीं रहा।',
  'Remove affected debris where practical.':
    'संभव हो तो प्रभावित पौधों के अवशेष हटा दें।',
  'Reduce prolonged leaf wetness.':
    'पत्तियों को लंबे समय तक गीला रहने से बचाएँ।',
  'Confirm the diagnosis before choosing a locally approved treatment.':
    'स्थानीय रूप से स्वीकृत उपचार चुनने से पहले बीमारी की पुष्टि करें।',
  'Tomato late blight can spread rapidly and damage leaves and stems.':
    'टमाटर का लेट ब्लाइट तेज़ी से फैलकर पत्तियों और तनों को नुकसान पहुँचा सकता है।',
  'Look for expanding dark or water-soaked lesions.':
    'फैलते हुए गहरे या पानी से भीगे धब्बे देखें।',
  'Inspect stems for darkened areas.': 'तनों पर गहरे पड़े हिस्सों की जाँच करें।',
  'Check nearby potato and tomato plants.':
    'पास के आलू और टमाटर के पौधों की जाँच करें।',
  'Seek prompt local agricultural advice.':
    'जल्द ही स्थानीय कृषि विशेषज्ञ से सलाह लें।',
  'Follow local disease alerts and approved management guidance.':
    'स्थानीय रोग चेतावनियों और स्वीकृत प्रबंधन सुझावों का पालन करें।',
  'Avoid moving potentially infected plant material.':
    'संक्रमित हो सकने वाली पौध सामग्री को दूसरी जगह ले जाने से बचें।',
  'Tomato leaf mold is associated with fungal growth, particularly under humid growing conditions.':
    'टमाटर का लीफ मोल्ड फफूंद से जुड़ा रोग है, जो खासकर नम वातावरण में बढ़ सकता है।',
  'Inspect leaf undersides for olive-green or grayish mold.':
    'पत्तियों की निचली सतह पर जैतूनी-हरे या धूसर रंग की फफूंद देखें।',
  'Look for pale yellow areas on the upper leaf surface.':
    'पत्ती की ऊपरी सतह पर हल्के पीले हिस्से देखें।',
  'Monitor whether affected leaves become dry.':
    'देखें कि प्रभावित पत्तियाँ सूख तो नहीं रही हैं।',
  'Improve ventilation where practical.':
    'संभव हो तो पौधों के बीच हवा का आवागमन बेहतर करें।',
  'Reduce prolonged leaf humidity.':
    'पत्तियों के लंबे समय तक नम रहने से बचाएँ।',
  'Remove affected plant debris where appropriate.':
    'उचित हो तो प्रभावित पौधों के अवशेष हटा दें।',
  'Septoria leaf spot is a fungal disease that produces small spots on tomato leaves.':
    'सेप्टोरिया पत्ती धब्बा एक फफूंद रोग है, जिससे टमाटर की पत्तियों पर छोटे धब्बे बनते हैं।',
  'Look for small circular spots with pale centers.':
    'हल्के रंग के केंद्र वाले छोटे गोल धब्बे देखें।',
  'Check for darker margins and tiny dark specks within spots.':
    'धब्बों के गहरे किनारों और भीतर छोटे काले बिंदुओं पर ध्यान दें।',
  'Inspect lower leaves for increasing damage.':
    'निचली पत्तियों पर बढ़ते नुकसान की जाँच करें।',
  'Avoid overhead irrigation where practical.':
    'संभव हो तो ऊपर से सिंचाई करने से बचें।',
  'Monitor nearby plants and confirm the diagnosis.':
    'पास के पौधों पर नज़र रखें और बीमारी की पुष्टि करें।',
  'Two-spotted spider mites are pests that feed on plant cells and can damage tomato leaves.':
    'दो-धब्बों वाले स्पाइडर माइट्स पौधों की कोशिकाओं का रस लेकर टमाटर की पत्तियों को नुकसान पहुँचा सकते हैं।',
  'Inspect leaf undersides for tiny mites.':
    'पत्तियों की निचली सतह पर छोटे माइट्स की जाँच करें।',
  'Look for fine pale stippling or bronzing.':
    'पत्तियों पर बारीक हल्के बिंदु या कांस्य जैसा रंग देखें।',
  'Check for fine webbing when infestations are substantial.':
    'प्रकोप अधिक होने पर महीन जाल की जाँच करें।',
  'Inspect several leaves to confirm mite presence.':
    'माइट्स की मौजूदगी की पुष्टि के लिए कई पत्तियों की जाँच करें।',
  'Monitor the extent of infestation.':
    'प्रकोप कितना फैला है, इस पर नज़र रखें।',
  'Seek local integrated pest-management advice before treatment.':
    'उपचार से पहले स्थानीय एकीकृत कीट प्रबंधन की सलाह लें।',
  'Tomato target spot is a leaf disease that can cause brown lesions, sometimes with concentric rings.':
    'टमाटर का टार्गेट स्पॉट पत्तियों का रोग है, जिससे भूरे धब्बे और कभी-कभी गोल छल्ले बनते हैं।',
  'Look for brown leaf spots with target-like rings.':
    'लक्ष्य जैसे छल्लों वाले भूरे पत्ती धब्बे देखें।',
  'Inspect lower leaves for spreading lesions.':
    'निचली पत्तियों पर फैलते धब्बों की जाँच करें।',
  'Check nearby plants for similar damage.':
    'पास के पौधों में भी ऐसे नुकसान की जाँच करें।',
  'Maintain appropriate airflow.':
    'पौधों के बीच हवा का उचित आवागमन बनाए रखें।',
  'Reduce prolonged leaf wetness where practical.':
    'संभव हो तो पत्तियों को लंबे समय तक गीला रहने से बचाएँ।',
  'Confirm the cause of lesions before selecting a treatment.':
    'उपचार चुनने से पहले धब्बों के कारण की पुष्टि करें।',
  'Tomato yellow leaf curl virus can cause leaf curling, yellowing, and stunted growth.':
    'टमाटर का येलो लीफ कर्ल वायरस पत्तियों का मुड़ना, पीलापन और पौधे की रुकी हुई वृद्धि पैदा कर सकता है।',
  'Look for upward curling and yellowing of leaves.':
    'पत्तियों का ऊपर की ओर मुड़ना और पीला पड़ना देखें।',
  'Check for stunted new growth.': 'नई वृद्धि के रुकने के लक्षण देखें।',
  'Inspect plants for whiteflies, which can transmit the virus.':
    'पौधों पर सफेद मक्खियों की जाँच करें, जो वायरस फैला सकती हैं।',
  'Seek local guidance on virus and whitefly management.':
    'वायरस और सफेद मक्खियों के नियंत्रण के लिए स्थानीय सलाह लें।',
  'Monitor nearby plants for similar symptoms.':
    'पास के पौधों में भी ऐसे लक्षणों पर नज़र रखें।',
  'Follow local advice for handling suspected infected plants.':
    'संक्रमित होने की आशंका वाले पौधों को संभालने के लिए स्थानीय सलाह मानें।',
  'Tomato mosaic virus can cause mottled leaf patterns and distorted plant growth.':
    'टमाटर का मोज़ेक वायरस पत्तियों पर चितकबरे निशान और पौधे की विकृत वृद्धि पैदा कर सकता है।',
  'Look for light and dark green mosaic patterns.':
    'हल्के और गहरे हरे रंग के मोज़ेक जैसे निशान देखें।',
  'Check for distorted leaves or uneven growth.':
    'पत्तियों के विकृत होने या असमान वृद्धि की जाँच करें।',
  'Inspect nearby plants for similar patterns.':
    'पास के पौधों में भी ऐसे निशान देखें।',
  'Clean hands and tools after handling suspect plants.':
    'संदिग्ध पौधों को छूने के बाद हाथ और औज़ार साफ़ करें।',
  'Use clean seed and planting material where applicable.':
    'जहाँ लागू हो, साफ़ बीज और रोपाई सामग्री का उपयोग करें।',
  'Seek local guidance before removing suspected infected plants.':
    'संक्रमित होने की आशंका वाले पौधों को हटाने से पहले स्थानीय सलाह लें।',
  'Inspect plants regularly for early symptoms.':
    'शुरुआती लक्षणों के लिए पौधों की नियमित जाँच करें।',
  'Avoid unnecessary prolonged leaf wetness.':
    'पत्तियों को लंबे समय तक अनावश्यक रूप से गीला न रहने दें।',
  'Maintain clean tools and suitable airflow.':
    'औज़ार साफ़ रखें और पौधों के बीच उचित हवा का आवागमन बनाए रखें।',
  'Check leaves for spots, mold, curling, or mosaic patterns.':
    'पत्तियों पर धब्बे, फफूँद, मुड़ना या मोज़ेक जैसे निशान देखें।',
  'Inspect the undersides of leaves for pests.':
    'कीटों के लिए पत्तियों की निचली सतह देखें।',
  'Monitor stems and new growth for changes.':
    'तनों और नई वृद्धि में बदलाव पर नज़र रखें।',
  'clear sky': 'साफ़ आसमान',
  'few clouds': 'कुछ बादल',
  'scattered clouds': 'बिखरे बादल',
  'broken clouds': 'आंशिक रूप से बादल',
  'overcast clouds': 'घने बादल',
  'light rain': 'हल्की बारिश',
  'moderate rain': 'मध्यम बारिश',
  'heavy intensity rain': 'तेज़ बारिश',
  'thunderstorm': 'आंधी-तूफ़ान',
  'mist': 'धुंध',
  'haze': 'धुंध',
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem('agrigrade-language') === 'hi'
        ? 'hi'
        : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'hi'
      ? 'AgriGrade — फसल की गुणवत्ता का स्वचालित आकलन'
      : 'AgriGrade — Automated Crop Quality Assessment';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      language === 'hi'
        ? hindiTranslations['Detect crop diseases, assess severity, and discover smarter ways to protect your harvest with AgriGrade\'s AI-powered crop analysis platform.']
        : 'Detect crop diseases, assess severity, and discover smarter ways to protect your harvest with AgriGrade\'s AI-powered crop analysis platform.'
    );
    try {
      window.localStorage.setItem('agrigrade-language', language);
    } catch {
      // Language selection still works for the current page if storage is unavailable.
    }
  }, [language]);

  const t = useCallback((text, values = {}) => {
    const translated = language === 'hi'
      ? hindiTranslations[text] ?? text
      : text;
    const replacements =
      values && typeof values === 'object' ? values : {};

    return translated.replace(/\{(\w+)\}/g, (match, key) =>
      Object.hasOwn(replacements, key) ? replacements[key] : match
    );
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
