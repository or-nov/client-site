# פריסת האתר ל-Firebase Hosting + Cloud Functions (לידים)

## מה שונה בפרויקט (קבצים)

| קובץ | שינוי |
|------|--------|
| `next.config.js` | `output: "export"`, `images: { unoptimized: true }` (הוסר standalone) |
| `package.json` | הוסר `postbuild` ו-`start` עודכן ל-`next start` |
| `firebase.json` | נוצר – hosting ל-site `aluon-new`, תיקייה `out`; הוסף `functions` |
| `functions/package.json` | נוצר – Node 20, firebase-functions, nodemailer |
| `functions/index.js` | נוצר – פונקציה `sendLead` (v2, CORS, secrets) |
| `src/components/ContactForm.tsx` | שימוש ב-`NEXT_PUBLIC_LEAD_ENDPOINT` כ-URL לשליחת טופס |
| `src/components/QuoteModal.tsx` | אותו שינוי |
| `src/components/sections/HomeQuoteForm.tsx` | אותו שינוי |

---

## חלק 1 — הכנה: Firebase CLI וחיבור לפרויקט

פתח טרמינל:

```bash
cd C:\dev\client-site\aluon-group-web
```

1. **התקנת Firebase CLI (אם חסר):**
   ```bash
   npm i -g firebase-tools
   ```
   **תוצאה צפויה:** התקנה גלובלית של `firebase-tools`.

2. **בדיקת גרסה:**
   ```bash
   firebase --version
   ```
   **תוצאה צפויה:** מספר גרסה (למשל 13.x.x).

3. **התחברות:**
   ```bash
   firebase login
   ```
   **תוצאה צפויה:** דפדפן ייפתח, התחברות עם חשבון Google, הודעה שההתחברות הצליחה.

4. **חיבור לפרויקט הקיים:**
   ```bash
   firebase use --add
   ```
   - בחר מהרשימה: **ALU Architectural Surfaces**
   - כשמבקשים alias: הקלד **aluon** ואישור.

5. **אימות:**
   ```bash
   firebase projects:list
   firebase use
   ```
   **תוצאה צפויה:** רשימת פרויקטים; `firebase use` יציג את הפרויקט ואת ה-alias `aluon`.

---

## חלק 2 — יצירת Hosting Site חדש

1. **יצירת site:**
   ```bash
   firebase hosting:sites:create aluon-new
   ```
   **תוצאה צפויה:** הודעה שהאתר `aluon-new` נוצר.

2. **אימות:**
   ```bash
   firebase hosting:sites:list
   ```
   **תוצאה צפויה:** `aluon-new` מופיע ברשימה (בנוסף ל-site הקיים).

---

## חלק 3 — בניית Next.js (export סטטי)

ההגדרות כבר עודכנו ב-`next.config.js`. רק להריץ:

```bash
npm install
npm run build
```

**תוצאה צפויה:** תיקייה `out` נוצרת עם `index.html` וקבצים סטטיים.

אימות:
```bash
dir out
dir out\index.html
```

---

## חלק 4 — Firebase init Hosting (אם צריך)

אם `firebase.json` כבר מכיל את ה-hosting (כמו בקובץ שנוצר), אפשר לדלג. אם תרצה להריץ init:

```bash
firebase init hosting
```

- Use an existing project → **aluon**
- Hosting site → **aluon-new**
- Public directory → **out**
- SPA → **No**
- GitHub deploy → **No**

וודא ש-`firebase.json` נראה כך:
```json
{
  "hosting": {
    "site": "aluon-new",
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  },
  "functions": { "source": "functions" }
}
```

---

## חלק 5 — Deploy ל-URL זמני (Hosting בלבד)

```bash
firebase deploy --only hosting
```

אם יש לך כמה sites וה-default לא `aluon-new`, השתמש ב:

```bash
firebase deploy --only hosting:aluon-new
```

**תוצאה צפויה:** בסיום יופיעו שורות כמו:
- `Hosting URL: https://aluon-new-XXXXX.web.app` (או דומה)

זה ה-**URL הזמני** של האתר. פתח אותו ובדוק דף ראשי + דף נוסף.

---

## חלק 6 — לידים למייל (Cloud Functions)

### 6.1 Init Functions (אם טרם נוצר)

אם תיקיית `functions` כבר קיימת עם `index.js` ו-`package.json`, דלג ל-6.2.

```bash
firebase init functions
```
- Language: **JavaScript**
- ESLint: לפי ברירת מחדל
- Install deps: Yes

אחר כך הוסף ידנית ל-`functions/package.json`: `"nodemailer": "^8.0.1"` והרץ `npm install` בתוך `functions`.

### 6.2 התקנת תלויות ב-functions

```bash
cd functions
npm install
cd ..
```

**תוצאה צפויה:** `nodemailer`, `firebase-functions`, `firebase-admin` מותקנים.

### 6.3 הגדרת Secrets (בלי להדפיס סיסמאות)

הרץ כל פקודה והזן את הערך כשמתבקש:

```bash
firebase functions:secrets:set SMTP_HOST
firebase functions:secrets:set SMTP_PORT
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASS
firebase functions:secrets:set MAIL_TO
firebase functions:secrets:set MAIL_FROM
```

ערכים לדוגמה (החלף בערכים האמיתיים):
- `SMTP_HOST` – למשל `smtp.gmail.com`
- `SMTP_PORT` – למשל `587`
- `SMTP_USER` – אימייל SMTP
- `SMTP_PASS` – סיסמת SMTP (או App Password)
- `MAIL_TO` – הכתובת שמקבלת לידים
- `MAIL_FROM` – הכתובת שמופיעה כ-"From" (למשל כמו SMTP_USER)

### 6.4 פריסת Functions פעם ראשונה (כדי לקבל URL)

```bash
firebase deploy --only functions
```

בסיום העתק את ה-URL שמופיע (למשל `https://europe-west1-XXXXXXXX.cloudfunctions.net/sendLead`).

### 6.5 בנייה עם URL של הפונקציה

אחרי שיש לך את ה-URL מהשלב הקודם, למשל:
`https://europe-west1-<project-id>.cloudfunctions.net/sendLead`

בנה את האתר עם המשתנה הזה (החלף ב-URL האמיתי אחרי deploy):

```bash
set NEXT_PUBLIC_LEAD_ENDPOINT=https://europe-west1-XXXXXXXX.cloudfunctions.net/sendLead
npm run build
```

ב-PowerShell:
```powershell
$env:NEXT_PUBLIC_LEAD_ENDPOINT="https://europe-west1-XXXXXXXX.cloudfunctions.net/sendLead"; npm run build
```

או צור קובץ `.env.local` בשורש הפרויקט (לא לעשות commit):
```
NEXT_PUBLIC_LEAD_ENDPOINT=https://europe-west1-XXXXXXXX.cloudfunctions.net/sendLead
```
ואז הרץ `npm run build`.

### 6.6 פריסת Hosting (ואם צריך גם Functions)

אחרי `npm run build` עם `NEXT_PUBLIC_LEAD_ENDPOINT`:

```bash
firebase deploy --only functions,hosting
```

או מפורש ל-site:
```bash
firebase deploy --only functions,hosting:aluon-new
```

**תוצאה צפויה:** בסיום יופיעו:
- Function URL: `https://europe-west1-<project-id>.cloudfunctions.net/sendLead`
- Hosting URL: `https://aluon-new-XXXXX.web.app`

### 6.7 בדיקות

**בדיקת הפונקציה עם curl (POST):**
```bash
curl -X POST "https://europe-west1-XXXXXXXX.cloudfunctions.net/sendLead" -H "Content-Type: application/json" -d "{\"formType\":\"home-quote\",\"source\":\"https://example.com\",\"fields\":{\"fullName\":\"Test\",\"phone\":\"0501234567\",\"email\":\"test@test.com\",\"message\":\"Hi\"}}"
```
**תוצאה צפויה:** `{"ok":true}`

**בדיקת טופס באתר:** היכנס ל-URL הזמני של האתר, מלא טופס ליד ושליחה – אמורה להצליח ומייל להגיע ל-`MAIL_TO`.

---

## חלק 7 — סיכום

### קבצים שנגעו בהם
- `next.config.js` – export + images unoptimized  
- `package.json` – הסרת postbuild, start  
- `firebase.json` – חדש (hosting + functions)  
- `functions/package.json`, `functions/index.js` – חדשים  
- `ContactForm.tsx`, `QuoteModal.tsx`, `HomeQuoteForm.tsx` – שימוש ב-`NEXT_PUBLIC_LEAD_ENDPOINT`

### URL זמני של האתר
אחרי `firebase deploy --only hosting` או `hosting:aluon-new`:
- **Hosting:** `https://aluon-new-XXXXX.web.app` (הערך המדויק יופיע בפלט הפקודה)

### URL של הפונקציה
אחרי `firebase deploy --only functions`:
- **sendLead:** `https://europe-west1-<project-id>.cloudfunctions.net/sendLead`

### Blaze (Billing)
**Cloud Functions עובדות רק בתוכנית Blaze (pay-as-you-go).**  
אם הפרויקט ב-Spark (חינם), ב-Firebase Console:
1. לך ל-**Project settings** (גלגל השיניים) → **Usage and billing**
2. לחץ **Modify plan** / **Upgrade to Blaze**
3. בחר **Blaze** ואשר (חיוב רק מעבר למכסה החינמית)

בלי שדרוג ל-Blaze, `firebase deploy --only functions` ייכשל או שהפונקציות לא יופעלו.

---

**הדומיין האמיתי לא מחובר** – רק ה-URL הזמני (web.app) בשימוש עד שתחליט לחבר דומיין.
