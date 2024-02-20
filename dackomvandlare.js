{\rtf1\ansi\ansicpg1252\cocoartf2759
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww17300\viewh15700\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', function() \{\
    initieraDropdowns();\
    document.getElementById('berakna').addEventListener('click', berakna);\
\});\
\
function fyllDropdown(id, varden, defaultValue) \{\
    const select = document.getElementById(id);\
    varden.forEach(value => \{\
        let option = document.createElement('option');\
        option.value = value;\
        option.text = value.toString();\
        if (value === defaultValue) \{\
            option.selected = true;\
        \}\
        select.appendChild(option);\
    \});\
\}\
\
function initieraDropdowns() \{\
    // Exempelv\'e4rden med decimaler f\'f6r f\'e4lgens bredd\
    fyllDropdown('bredd1', [135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345], 225);\
    fyllDropdown('profil1', [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 82], 40);\
    fyllDropdown('diameter1', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 18);\
    fyllDropdown('falgBredd1', [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14], 8);\
    \
    fyllDropdown('bredd2', [135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345], 265);\
    fyllDropdown('profil2', [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 82], 35);\
    fyllDropdown('diameter2', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 18);\
    fyllDropdown('falgBredd2', [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14], 9.5);\
\}\
function beraknaDiameterOchOmkrets(bredd, profil, diameter) \{\
    let sidohojdMM = bredd * (profil / 100);\
    let falgDiameterMM = diameter * 25.4; // Omvandla f\'e4lgdiametern fr\'e5n tum till millimeter\
    let totalDiameterMM = (sidohojdMM * 2) + falgDiameterMM; // Total diameter i millimeter\
    let omkretsMM = Math.PI * totalDiameterMM; // Omkrets i millimeter\
    return \{ sidohojdMM, totalDiameterMM, omkretsMM \};\
\}\
\
function berakna() \{\
    // Anv\'e4nd parseFloat f\'f6r att korrekt hantera decimaltal\
    let bredd1 = parseFloat(document.getElementById('bredd1').value);\
    let profil1 = parseFloat(document.getElementById('profil1').value);\
    let diameter1 = parseFloat(document.getElementById('diameter1').value);\
    let falgBredd1 = parseFloat(document.getElementById('falgBredd1').value);\
\
    let bredd2 = parseFloat(document.getElementById('bredd2').value);\
    let profil2 = parseFloat(document.getElementById('profil2').value);\
    let diameter2 = parseFloat(document.getElementById('diameter2').value);\
    let falgBredd2 = parseFloat(document.getElementById('falgBredd2').value);\
\
\
    let dack1 = beraknaDiameterOchOmkrets(bredd1, profil1, diameter1);\
    let dack2 = beraknaDiameterOchOmkrets(bredd2, profil2, diameter2);\
\
    let skillnadDiameterMM = dack2.totalDiameterMM - dack1.totalDiameterMM;\
    let skillnadOmkretsMM = dack2.omkretsMM - dack1.omkretsMM;\
    let skillnadOmkretsProcent = (skillnadOmkretsMM / dack1.omkretsMM) * 100;\
    let faktiskHastighetVid100 = (100 * dack2.omkretsMM) / dack1.omkretsMM;\
    let hojdskillnadPaBilenMM = skillnadDiameterMM / 2; // H\'f6jdf\'f6r\'e4ndring p\'e5 bilen\
    let luftRuntHjulenMM = -skillnadDiameterMM / 2; // H\'f6jdf\'f6r\'e4ndring p\'e5 bilen\
\
    document.getElementById('resultat').innerHTML = `\
        <table>\
            <tr>\
                <th>Parameter</th>\
                <th>Befintligt</th>\
                <th>Nya</th>\
            </tr>\
            <tr>\
                <td>Total Diameter</td>\
                <td>$\{dack1.totalDiameterMM.toFixed(2)\} mm</td>\
                <td>$\{dack2.totalDiameterMM.toFixed(2)\} mm</td>\
            </tr>\
            <tr>\
                <td>Rullomkrets</td>\
                <td>$\{dack1.omkretsMM.toFixed(2)\} mm</td>\
                <td>$\{dack2.omkretsMM.toFixed(2)\} mm</td>\
            </tr>\
            <tr>\
                <td>D\'e4ckets sidoh\'f6jd</td>\
                <td>$\{dack1.sidohojdMM.toFixed(2)\} mm</td>\
                <td>$\{dack2.sidohojdMM.toFixed(2)\} mm</td>\
            </tr>\
            <tr>\
                <td>Skillnad i diameter</td>\
                <td>0 mm</td>\
                <td>$\{skillnadDiameterMM.toFixed(2)\} mm</td>\
            </tr>\
            <tr>\
                <td>Skillnad i rullomkrets</td>\
                <td>0 mm</td>\
                <td>$\{skillnadOmkretsMM.toFixed(2)\} mm</td>\
            </tr>\
            <tr>\
                <td>Skillnad i rullomkrets</td>\
                <td>0%</td>\
                <td>$\{skillnadOmkretsProcent.toFixed(2)\}%</td>\
            </tr>\
            <tr>\
                <td> Vid 100 km/h p\'e5 m\'e4taren</td>\
                <td>0 km/h</td>\
                <td>$\{faktiskHastighetVid100.toFixed(2)\} km/h</td>\
            </tr>\
            <tr>\
                <td>H\'f6jdskillnad p\'e5 bilen</td>\
                <td>0 mm</td>\
                <td>$\{hojdskillnadPaBilenMM.toFixed(2)\} mm</td>\
            </tr>\
             <tr>\
                <td>Mer/mindre luft runt hjulet</td>\
                <td>0 mm</td>\
                <td>$\{luftRuntHjulenMM.toFixed(2)\} mm</td>\
            </tr>\
        </table>\
    `;\
\
    // Rita upp hjulen baserat p\'e5 anv\'e4ndarinput\
    ritaHjulen(bredd1, profil1, diameter1, falgBredd1, bredd2, profil2, diameter2, falgBredd2);\
\}\
\
function ritaHjulen(bredd1, profil1, diameter1, falgBredd1, bredd2, profil2, diameter2, falgBredd2) \{\
    let canvas = document.getElementById('dackCanvas');\
    if (canvas.getContext) \{\
        let ctx = canvas.getContext('2d');\
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa canvas\
\
        // Ber\'e4kna och rita det f\'f6rsta hjulet (ursprungliga)\
				ritaDackOchFalg(ctx, 150, bredd1, profil1, diameter1, falgBredd1, '#44a9c2');\
        // Ber\'e4kna och rita det andra hjulet (nya)\
        ritaDackOchFalg(ctx, 450, bredd2, profil2, diameter2, falgBredd2, '#29c666');\
    \}\
\}\
\
function ritaDackOchFalg(ctx, x, dackBredd, profil, diameter, falgBredd, falgFarg) \{\
    const skala = 0.6; // Anpassa efter behov\
    const mmPerTum = 25.4;\
    const dackBreddPixel = dackBredd * skala;\
    const falgBreddPixel = (falgBredd * mmPerTum + 23) * skala;\
    const falgCentrumY = ctx.canvas.height / 2;\
\
    const profilHojdPixel = dackBredd * profil / 100 * skala;\
    const falgDiameterPixel = diameter * mmPerTum * skala;\
\
    const linjeTjocklek = 2; // Variabel f\'f6r linjetjocklek, enkelt att justera\
\
    // Ber\'e4kna var d\'e4ckets \'f6vre och undre delar ska b\'f6rja i f\'f6rh\'e5llande till f\'e4lgen\
    const dackTopp = falgCentrumY - (falgDiameterPixel / 2 + profilHojdPixel);\
    const dackBotten = falgCentrumY + (falgDiameterPixel / 2 + profilHojdPixel);\
\
    ctx.lineWidth = linjeTjocklek; // S\'e4tter linjetjockleken f\'f6r b\'e5de d\'e4ck och f\'e4lg\
\
    // Ritar \'f6vre delen av d\'e4cket som linje\
    ctx.beginPath();\
    ctx.strokeStyle = 'black'; // Svarta linjer f\'f6r d\'e4cken\
    ctx.moveTo(x - falgBreddPixel / 2, falgCentrumY - falgDiameterPixel / 2);\
    ctx.lineTo(x - dackBreddPixel / 2, dackTopp);\
    ctx.lineTo(x + dackBreddPixel / 2, dackTopp);\
    ctx.lineTo(x + falgBreddPixel / 2, falgCentrumY - falgDiameterPixel / 2);\
    ctx.stroke(); // Anv\'e4nder stroke f\'f6r att rita d\'e4ckets \'f6vre del\
\
    // Ritar undre delen av d\'e4cket som linje\
    ctx.beginPath();\
    ctx.moveTo(x - falgBreddPixel / 2, falgCentrumY + falgDiameterPixel / 2);\
    ctx.lineTo(x - dackBreddPixel / 2, dackBotten);\
    ctx.lineTo(x + dackBreddPixel / 2, dackBotten);\
    ctx.lineTo(x + falgBreddPixel / 2, falgCentrumY + falgDiameterPixel / 2);\
    ctx.closePath();\
    ctx.stroke(); // Anv\'e4nder stroke f\'f6r att rita d\'e4ckets undre del\
\
    // Ritar f\'e4lgen som linjer\
    ctx.strokeStyle = falgFarg; // Anv\'e4nder den angivna f\'e4rgen f\'f6r f\'e4lgen\
    ctx.strokeRect(x - falgBreddPixel / 2, falgCentrumY - falgDiameterPixel / 2, falgBreddPixel, falgDiameterPixel);\
\}\
}