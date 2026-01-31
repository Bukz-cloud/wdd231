window.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    
    // Create current date-time with leading zeros
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    timestampField.value = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
});

const myInfo = new URLSearchParams(window.location.search);
//console.log(myInfo);

console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('title'));
console.log(myInfo.get('organization'));
console.log(myInfo.get('province'));
console.log(myInfo.get('timestamp'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('email'));
console.log(myInfo.get('website'));
console.log(myInfo.get('membership'));
console.log(myInfo.get('physicalAddress'));
console.log(myInfo.get('postalAddress'));
console.log(myInfo.get('message'));



document.getElementById('results').innerHTML = `
<p>Membership form for ${myInfo.get('first')}  ${myInfo.get('last')} with the ${myInfo.get('title')} title</p>
<p>Proxy ${myInfo.get('organization')} on ${myInfo.get('timestamp')} in the ${myInfo.get('province')} South Africa</p>
<p>Your Phone: ${myInfo.get('phone')}</p>
<p>Your email is ${myInfo.get('email')}</p>
<p>Your physical address is ${myInfo.get('physicalAddress')}</p>
<p>Your postal address is ${myInfo.get('postalAddress')}</p>
<p>Your website is ${myInfo.get('website')}</p>
<p>Your company's description is ${myInfo.get('message')}</p>
<p>Your company's memership preference is ${myInfo.get('membership')} level.</p>
`
