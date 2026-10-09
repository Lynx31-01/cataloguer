(function () {

"use strict";

/*
 * ============================================================
 * BELMARC FIELD DICTIONARY
 * ============================================================
 */

const BELMARC_FIELDS = [

    ["001", "Идентификатор записи"],
    ["003", "Постоянный идентификатор записи"],
    ["005", "Идентификатор версии записи"],

    ["010", "Международный стандартный номер книги (ISBN)"],
    ["017", "Другой идентификатор"],
    ["033", "Постоянный идентификатор записи другой системы"],
    ["035", "Контрольный номер других систем"],

    ["100", "Данные общей обработки"],
    ["101", "Язык объекта"],
    ["102", "Национальная принадлежность объекта"],
    ["105", "Кодированные данные: текстовые материалы"],
    ["106", "Кодированные данные имени/организации/торговой марки"],
    ["120", "Кодированные данные имени лица"],
    ["123", "Кодированные данные географического названия"],
    ["150", "Кодированные данные наименования организации"],
    ["152", "Коды правил каталогизации и системы предметизации"],
    ["154", "Кодированные данные заглавия"],
    ["160", "Код географического региона"],

    ["200", "Заглавие и сведения об ответственности"],
    ["203", "Вид содержания и тип средства"],
    ["205", "Сведения об издании"],
    ["206", "Специфические сведения: картографические материалы"],
    ["207", "Нумерация продолжающихся ресурсов"],
    ["208", "Специфические сведения: нотные издания"],
    ["210", "Публикация, распространение и изготовление"],
    ["211", "Запланированная дата издания"],
    ["215", "Физическая характеристика"],
    ["225", "Серия"],

    ["300", "Справочное примечание"],
    ["304", "Примечание о библиографической ответственности"],
    ["305", "Ссылочное примечание «см. также»"],
    ["310", "Ссылочное примечание «см.»"],
    ["320", "Общее пояснительно-ссылочное примечание"],
    ["330", "Примечание об области применения"],
    ["340", "Примечание о биографии и деятельности"],
    ["341", "Примечание о деятельности издателя/типографа"],
    ["356", "Географическое примечание"],

    ["400", "Вариантная точка доступа — имя лица"],
    ["410", "Вариантная точка доступа — наименование организации"],
    ["415", "Вариантная точка доступа — географическое название"],
    ["416", "Вариантная точка доступа — торговая марка"],
    ["417", "Вариантная точка доступа — издательский знак"],
    ["420", "Вариантная точка доступа — родовое имя"],
    ["430", "Вариантная точка доступа — заглавие"],
    ["440", "Вариантная точка доступа — имя/заглавие"],
    ["450", "Вариантная точка доступа — наименование темы"],
    ["460", "Вариантная точка доступа — место и дата"],

    ["500", "Связанная точка доступа — имя лица"],
    ["510", "Связанная точка доступа — наименование организации"],
    ["515", "Связанная точка доступа — географическое название"],
    ["516", "Связанная точка доступа — торговая марка"],
    ["517", "Связанная точка доступа — издательский знак"],
    ["520", "Связанная точка доступа — родовое имя"],
    ["530", "Связанная точка доступа — заглавие"],
    ["540", "Связанная точка доступа — имя/заглавие"],
    ["550", "Связанная точка доступа — наименование темы"],
    ["560", "Связанная точка доступа — место и дата"],

    ["606", "Контролируемое наименование темы"],
    ["610", "Неунифицированные тематические термины"],
    ["640", "Места и даты, связанные с объектом"],
    ["675", "Универсальная десятичная классификация (УДК)"],
    ["686", "Индексы других классификаций"],

    ["700", "Принятая точка доступа — имя лица"],
    ["701", "Принятая точка доступа — дополнительное имя лица"],
    ["702", "Вариантная/дополнительная точка доступа — имя лица"],
    ["710", "Принятая точка доступа — наименование организации"],
    ["711", "Дополнительная точка доступа — наименование организации"],
    ["712", "Вариантная/дополнительная точка доступа — организация"],

    ["801", "Источник записи"],
    ["810", "Источник информации о точке доступа"],
    ["815", "Источник, в котором информация не выявлена"],
    ["820", "Информация об использовании точки доступа"],
    ["825", "Пример, приведенный в примечании"],
    ["830", "Общее примечание каталогизатора"],
    ["835", "Информация об исключенной точке доступа"],
    ["836", "Информация о замененной точке доступа"],
    ["856", "Электронный адрес и способ доступа"],
    ["886", "Данные, не конвертируемые из исходного формата"],

    ["999", "Лица — составители записи"]
];


/*
 * ============================================================
 * DOM
 * ============================================================
 */

const freeDesc =
    document.getElementById("freeDesc");

const parseBtn =
    document.getElementById("parseBtn");

const exampleBtn =
    document.getElementById("exampleBtn");

const clearBtn =
    document.getElementById("clearBtn");

const recordId =
    document.getElementById("recordId");

const language =
    document.getElementById("language");

const country =
    document.getElementById("country");

const cataloguer =
    document.getElementById("cataloguer");

const fieldsContainer =
    document.getElementById("fieldsContainer");

const addFieldBtn =
    document.getElementById("addFieldBtn");

const belmarcReference =
    document.getElementById("belmarcReference");

const output =
    document.getElementById("output");

const outputFormat =
    document.getElementById("outputFormat");

const copyBtn =
    document.getElementById("copyBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const parseStatus =
    document.getElementById("parseStatus");

const catalogCard =
    document.getElementById("catalogCard");


/*
 * ============================================================
 * EXAMPLE
 * ============================================================
 */

const EXAMPLE = `Колас, Якуб.

На прасторах жыцця / Я. Колас.
Міколка-паравоз / М. Лынькоў.
Палескія рабінзоны : аповесці : [для малодшага школьнага ўзросту] / Я. Маўр.`;


/*
 * ============================================================
 * STATE
 * ============================================================
 */

let parsedRecord = null;
let dynamicFields = [];


/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function normalizeText(text) {

    return String(text || "")
        .replace(/\u00A0/g, " ")
        .replace(/[‐-‒–—―]/g, "—")
        .replace(/\s+/g, " ")
        .trim();
}


function cleanValue(value) {

    return normalizeText(value)
        .replace(/\s+([,.;:])/g, "$1")
        .trim();
}


function escapeXml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}


function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function fieldName(tag) {

    const item =
        BELMARC_FIELDS.find(
            item => item[0] === tag
        );

    return item
        ? item[1]
        : "Пользовательское поле";
}


/*
 * ============================================================
 * REFERENCE
 * ============================================================
 */

function renderReference() {

    if (!belmarcReference) {
        return;
    }

    belmarcReference.innerHTML = "";

    BELMARC_FIELDS.forEach(
        ([tag, name]) => {

            const item =
                document.createElement("div");

            item.className =
                "reference-item";

            item.innerHTML = `
                <span class="reference-tag">
                    ${escapeHtml(tag)}
                </span>
                ${escapeHtml(name)}
            `;

            belmarcReference.appendChild(item);
        }
    );
}


/*
 * ============================================================
 * DYNAMIC FIELDS
 * ============================================================
 */

function addDynamicField(
    tag = "",
    value = ""
) {

    dynamicFields.push({
        tag: String(tag).trim(),
        value: String(value)
    });

    renderDynamicFields();
    updateOutput();
}


function renderDynamicFields() {

    if (!fieldsContainer) {
        return;
    }

    fieldsContainer.innerHTML = "";

    dynamicFields.forEach(
        (field, index) => {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "dynamic-field";

            wrapper.innerHTML = `
                <div>
                    <div class="dynamic-tag">
                        ${escapeHtml(
                            field.tag || "TAG"
                        )}
                    </div>
                </div>

                <textarea
                    data-index="${index}"
                    class="dynamic-value"
                    spellcheck="false"
                    placeholder="Например: 1#$aЗаглавие$fАвтор"
                >${escapeHtml(field.value)}</textarea>

                <button
                    type="button"
                    class="remove-field"
                    data-index="${index}"
                    title="Удалить поле"
                    aria-label="Удалить поле"
                >×</button>
            `;

            fieldsContainer.appendChild(wrapper);
        }
    );

    fieldsContainer
        .querySelectorAll(".dynamic-value")
        .forEach(textarea => {

            textarea.addEventListener(
                "input",
                function () {

                    const index =
                        Number(this.dataset.index);

                    if (!dynamicFields[index]) {
                        return;
                    }

                    dynamicFields[index].value =
                        this.value;

                    updateOutput();
                }
            );
        });

    fieldsContainer
        .querySelectorAll(".remove-field")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(this.dataset.index);

                    dynamicFields.splice(
                        index,
                        1
                    );

                    renderDynamicFields();
                    updateOutput();
                }
            );
        });
}


/*
 * ============================================================
 * PERSON NAME
 * ============================================================
 */

function parsePersonName(value) {

    let raw =
        cleanValue(value)
            .replace(/\.$/, "")
            .trim();

    raw =
        raw
            .replace(/^\/\s*/, "")
            .replace(/^\[\s*/, "")
            .replace(/\s*\]$/, "")
            .trim();

    if (!raw) {
        return null;
    }

    const commaMatch =
        raw.match(
            /^([^,]+),\s*(.+)$/u
        );

    if (commaMatch) {

        const surname =
            cleanValue(commaMatch[1]);

        const given =
            cleanValue(commaMatch[2]);

        return {
            display:
                `${surname}, ${given}`,

            surname,

            given,

            initials:
                extractInitials(given)
        };
    }

    const initialsBeforeSurname =
        raw.match(
            /^((?:[А-ЯЁІЎA-Z]\.\s*)+)([А-ЯЁІЎA-ZА-Яёіўa-z-]+)$/u
        );

    if (initialsBeforeSurname) {

        const initials =
            cleanValue(
                initialsBeforeSurname[1]
            );

        const surname =
            cleanValue(
                initialsBeforeSurname[2]
            );

        return {
            display:
                `${initials} ${surname}`,

            surname,

            given: "",

            initials
        };
    }

    return {
        display: raw,

        surname: raw,

        given: "",

        initials: ""
    };
}


function extractInitials(value) {

    const matches =
        String(value || "")
            .match(
                /(?:^|\s)([А-ЯЁІЎA-Z]\.)/gu
            );

    if (!matches) {
        return "";
    }

    return matches
        .map(item => item.trim())
        .join(" ");
}


/*
 * ============================================================
 * RESPONSIBILITY
 * ============================================================
 */

const RESPONSIBILITY_CODES = {

    editor: "340",
    compiler: "220",
    translator: "730",
    illustrator: "440",
    photographer: "600",
    other: ""
};


function getResponsibilityRole(value) {

    const text =
        normalizeText(value)
            .toLowerCase();

    if (
        /\b(?:редактор|ред\.|под редакцией|под общ\. ред\.|под общей редакцией)\b/u
            .test(text)
    ) {
        return "editor";
    }

    if (
        /\b(?:составитель|сост\.|составлено)\b/u
            .test(text)
    ) {
        return "compiler";
    }

    if (
        /\b(?:переводчик|перевод|пер\.|перевела|перевёл|перевел)\b/u
            .test(text)
    ) {
        return "translator";
    }

    if (
        /\b(?:иллюстратор|ил\.|художник|худож\.|рисунки)\b/u
            .test(text)
    ) {
        return "illustrator";
    }

    if (
        /\b(?:фотограф|фот\.|фотография)\b/u
            .test(text)
    ) {
        return "photographer";
    }

    return "author";
}


function responsibilityRoleCode(role) {

    return RESPONSIBILITY_CODES[role] || "";
}


function hasEtAl(value) {

    return /\b(?:и\s+др\.?|и\s+другие|et\s+al\.?)\b/iu
        .test(
            normalizeText(value)
        );
}


/*
 * ============================================================
 * RESPONSIBILITY AREA
 * ============================================================
 */

function extractResponsibilityArea(value) {

    let source =
        cleanValue(value);

    if (!source) {
        return "";
    }

    source =
        source.replace(
            /\.\s*$/u,
            ""
        ).trim();

    const publicationPatterns = [

        /\s+—\s+[^—:]+?\s*:\s*[^—,]+?,\s*(?:\[?\d{4}\]?)/u,

        /\s+—\s+[^—:]+?\s*:\s*[^—]+?,\s*(?:\[?\d{4}\]?)/u
    ];

    for (
        const pattern of publicationPatterns
    ) {

        const match =
            source.match(pattern);

        if (match) {

            source =
                source
                    .slice(
                        0,
                        match.index
                    )
                    .trim();

            break;
        }
    }

    const physicalMatch =
        source.match(
            /\s+—\s+\d+(?:,\s*\[\d+\])?\s*(?:с\.|стр\.|л\.|экз\.|диск|диска|CD|DVD)\b.*$/iu
        );

    if (physicalMatch) {

        source =
            source
                .slice(
                    0,
                    physicalMatch.index
                )
                .trim();
    }

    const isbnIndex =
        source.search(
            /\s+—\s+ISBN\b/iu
        );

    if (isbnIndex !== -1) {

        source =
            source
                .slice(
                    0,
                    isbnIndex
                )
                .trim();
    }

    const seriesIndex =
        source.search(
            /\s+—\s+\(/u
        );

    if (seriesIndex !== -1) {

        source =
            source
                .slice(
                    0,
                    seriesIndex
                )
                .trim();
    }

    return source
        .replace(/\.\s*$/u, "")
        .trim();
}


/*
 * ============================================================
 * RESPONSIBILITY MARKERS
 * ============================================================
 */

function stripResponsibilityMarkers(value) {

    return cleanValue(value)
        .replace(/^\[\s*/u, "")
        .replace(/\s*\]\s*$/u, "")
        .replace(
            /\b(?:и\s+др\.?|и\s+другие|et\s+al\.?)\b/iu,
            ""
        )
        .replace(
            /\b(?:под\s+общей\s+редакцией|под\s+общ\.?\s+ред\.?|под\s+редакцией|редактор|ред\.)\b/iu,
            ""
        )
        .replace(
            /\b(?:составитель|сост\.)\b/iu,
            ""
        )
        .replace(
            /\b(?:переводчик|перевод|пер\.)\b/iu,
            ""
        )
        .replace(
            /\b(?:иллюстратор|ил\.|художник|худож\.|рисунки)\b/iu,
            ""
        )
        .replace(
            /\b(?:фотограф|фот\.|фотография)\b/iu,
            ""
        )
        .replace(
            /^\s*[:;,]\s*/u,
            ""
        )
        .trim();
}


/*
 * ============================================================
 * PERSON TOKEN TESTS
 * ============================================================
 */

function looksLikeInitialSurname(value) {

    return /^(?:[А-ЯЁІЎA-Z]\.\s*){1,3}[А-ЯЁІЎA-ZА-Яёіўa-z-]+$/u
        .test(
            cleanValue(value)
        );
}


function looksLikeSurnameInitials(value) {

    return /^[А-ЯЁІЎA-ZА-Яёіўa-z-]+,\s*(?:[А-ЯЁІЎA-Z]\.\s*){1,3}$/u
        .test(
            cleanValue(value)
        );
}


function looksLikePerson(value) {

    const candidate =
        cleanValue(value);

    return (
        looksLikeInitialSurname(candidate) ||
        looksLikeSurnameInitials(candidate)
    );
}


/*
 * ============================================================
 * SPLIT RESPONSIBILITY PERSONS
 * ============================================================
 */

function splitResponsibilityPersons(value) {

    let source =
        stripResponsibilityMarkers(value);

    if (!source) {
        return [];
    }

    source =
        source
            .replace(
                /\s+(?:и|&)\s+/giu,
                ";"
            )
            .replace(
                /\s*;\s*/g,
                ";"
            )
            .trim();

    if (source.includes(";")) {

        return source
            .split(";")
            .map(cleanValue)
            .filter(Boolean);
    }

    const initialSurnamePattern =
        /(?:[А-ЯЁІЎA-Z]\.\s*){1,3}[А-ЯЁІЎA-ZА-Яёіўa-z-]+/gu;

    const initialSurnameMatches =
        source.match(
            initialSurnamePattern
        );

    if (
        initialSurnameMatches &&
        initialSurnameMatches.length >= 2
    ) {

        const reconstructed =
            initialSurnameMatches
                .map(cleanValue);

        const remainder =
            source
                .replace(
                    initialSurnamePattern,
                    ""
                )
                .replace(
                    /[,;\s]+/g,
                    ""
                );

        if (!remainder) {
            return reconstructed;
        }
    }

    const surnameInitialsPattern =
        /[А-ЯЁІЎA-ZА-Яёіўa-z-]+,\s*(?:[А-ЯЁІЎA-Z]\.\s*){1,3}/gu;

    const surnameInitialsMatches =
        source.match(
            surnameInitialsPattern
        );

    if (
        surnameInitialsMatches &&
        surnameInitialsMatches.length >= 2
    ) {

        const reconstructed =
            surnameInitialsMatches
                .map(cleanValue);

        const remainder =
            source
                .replace(
                    surnameInitialsPattern,
                    ""
                )
                .replace(
                    /[,;\s]+/g,
                    ""
                );

        if (!remainder) {
            return reconstructed;
        }
    }

    if (
        looksLikePerson(source)
    ) {
        return [source];
    }

    const commaParts =
        source
            .split(",")
            .map(cleanValue)
            .filter(Boolean);

    if (!commaParts.length) {
        return [];
    }

    const result = [];

    let i = 0;

    while (
        i < commaParts.length
    ) {

        const current =
            commaParts[i];

        if (
            i + 1 < commaParts.length &&
            /^(?:[А-ЯЁІЎA-Z]\.\s*){1,3}$/u
                .test(
                    commaParts[i + 1]
                ) &&
            /^[А-ЯЁІЎA-ZА-Яёіўa-z-]+$/u
                .test(current)
        ) {

            result.push(
                `${current}, ${commaParts[i + 1]}`
            );

            i += 2;

            continue;
        }

        result.push(current);

        i++;
    }

    return result
        .filter(Boolean);
}


/*
 * ============================================================
 * RESPONSIBILITY PERSONS
 * ============================================================
 */

function parseResponsibilityPersons(value) {

    const raw =
        cleanValue(value);

    if (!raw) {
        return [];
    }

    const role =
        getResponsibilityRole(raw);

    const roleCode =
        responsibilityRoleCode(role);

    const personParts =
        splitResponsibilityPersons(raw);

    const persons = [];

    personParts.forEach(
        part => {

            const person =
                parsePersonName(part);

            if (
                !person ||
                !person.surname
            ) {
                return;
            }

            if (
                /^(?:редактор|составитель|переводчик|иллюстратор|художник|фотограф)$/iu
                    .test(
                        person.surname
                    )
            ) {
                return;
            }

            persons.push({

                person,

                role,

                roleCode
            });
        }
    );

    return persons;
}


/*
 * ============================================================
 * RESPONSIBILITY PARSER
 * ============================================================
 */

function parseResponsibility(value) {

    return extractResponsibilityArea(
        cleanValue(value)
    );
}


/*
 * ============================================================
 * LEADING AUTHOR
 * ============================================================
 */

function parseInitialAuthor(text) {

    const value =
        normalizeText(text);

    const match =
        value.match(
            /^([А-ЯЁІЎA-ZА-Яёіўa-z-]+),\s*((?:[А-ЯЁІЎA-Z]\.\s*){1,3}|[А-ЯЁІЎA-ZА-Яёіўa-z-]+(?:\s+[А-ЯЁІЎA-ZА-Яёіўa-z-]+){0,2})\.\s+/u
        );

    if (!match) {
        return null;
    }

    const surname =
        cleanValue(match[1]);

    const given =
        cleanValue(match[2]);

    if (
        !surname ||
        !given
    ) {
        return null;
    }

    return parsePersonName(
        `${surname}, ${given}`
    );
}


function getLeadingAuthorTextLength(text) {

    const value =
        normalizeText(text);

    const match =
        value.match(
            /^([А-ЯЁІЎA-ZА-Яёіўa-z-]+),\s*((?:[А-ЯЁІЎA-Z]\.\s*){1,3}|[А-ЯЁІЎA-ZА-Яёіўa-z-]+(?:\s+[А-ЯЁІЎA-ZА-Яёіўa-z-]+){0,2})\.\s+/u
        );

    return match
        ? match[0].length
        : 0;
}


/*
 * ============================================================
 * TITLE AREA
 * ============================================================
 */

function splitTitleRelatedInformation(value) {

    const parts =
        value
            .split(/\s*:\s*/)
            .map(cleanValue)
            .filter(Boolean);

    if (!parts.length) {

        return {
            title: "",
            relatedTitles: []
        };
    }

    return {

        title: parts[0],

        relatedTitles:
            parts.slice(1)
    };
}


function parseTitleArea(text) {

    let source =
        normalizeText(text);

    const result = [];

    if (!source) {
        return result;
    }

    const leadingAuthor =
        parseInitialAuthor(source);

    if (leadingAuthor) {

        const leadingAuthorLength =
            getLeadingAuthorTextLength(source);

        if (
            leadingAuthorLength > 0
        ) {

            source =
                source
                    .slice(
                        leadingAuthorLength
                    )
                    .trim();
        }
    }

    const publicationIndex =
        source.search(
            /\s+—\s+(?=[^—]+:\s*(?:\[?\d{4}|[12]\d{3}))/u
        );

    if (publicationIndex !== -1) {

        source =
            source
                .slice(
                    0,
                    publicationIndex
                )
                .trim();
    }

    const physicalIndex =
        source.search(
            /\s+—\s+(?=\d+(?:,\s*\[\d+\])?\s*(?:с\.|стр\.|л\.|экз\.))/iu
        );

    if (physicalIndex !== -1) {

        source =
            source
                .slice(
                    0,
                    physicalIndex
                )
                .trim();
    }

    const chunks =
        source
            .split(/\s+\/\s+/)
            .map(cleanValue)
            .filter(Boolean);

    if (chunks.length >= 2) {

        for (
            let i = 0;
            i < chunks.length;
            i += 2
        ) {

            const titlePart =
                chunks[i];

            const responsibility =
                chunks[i + 1] || "";

            if (!titlePart) {
                continue;
            }

            const colonParts =
                splitTitleRelatedInformation(
                    titlePart
                );

            result.push({

                title:
                    colonParts.title,

                relatedTitles:
                    colonParts.relatedTitles,

                responsibility:
                    parseResponsibility(
                        responsibility
                    )
            });
        }

        return result;
    }

    if (source) {

        const colonParts =
            splitTitleRelatedInformation(
                source
            );

        result.push({

            title:
                colonParts.title,

            relatedTitles:
                colonParts.relatedTitles,

            responsibility: ""
        });
    }

    return result;
}


/*
 * ============================================================
 * ISBN
 * ============================================================
 */

function parseISBN(text) {

    const match =
        normalizeText(text).match(
            /\b(?:ISBN(?:-1[03])?\s*)?((?:97[89][-\s]?)?\d(?:[-\s]?\d){8,16}[\dXx])\b/i
        );

    if (!match) {
        return "";
    }

    return match[1]
        .replace(/\s+/g, "-");
}


/*
 * ============================================================
 * UDC
 * ============================================================
 */

function parseUDC(text) {

    const match =
        normalizeText(text).match(
            /(?:УДК|UDC)\s*[:\-]?\s*([0-9][0-9.\-:/()]+[0-9а-яА-Я]*)/i
        );

    return match
        ? match[1].trim()
        : "";
}


/*
 * ============================================================
 * LANGUAGE
 * ============================================================
 */

function detectLanguage(text) {

    const value =
        normalizeText(text);

    if (
        /\b(?:белорус\.|беларус\.|беларуск|белорусский|belarusian)\b/iu
            .test(value)
    ) {
        return "bel";
    }

    if (
        /\b(?:англ\.|английский|english|in english)\b/iu
            .test(value)
    ) {
        return "eng";
    }

    if (
        /\b(?:нем\.|немецкий|german)\b/iu
            .test(value)
    ) {
        return "ger";
    }

    if (
        /\b(?:франц\.|французский|french)\b/iu
            .test(value)
    ) {
        return "fre";
    }

    if (
        /\b(?:рус\.|русский|russian)\b/iu
            .test(value)
    ) {
        return "rus";
    }

    return (
        language &&
        language.value.trim()
    ) || "rus";
}


/*
 * ============================================================
 * COUNTRY
 * ============================================================
 */

function detectCountry(text) {

    const value =
        normalizeText(text);

    if (
        /Беларус|Белорус|Минск|Гродно|Гомель|Брест|Витебск|Могилев|Магілёў/iu
            .test(value)
    ) {
        return "BY";
    }

    if (
        /Россия|Москва|Санкт-Петербург|Персиановский|Ростов/iu
            .test(value)
    ) {
        return "RU";
    }

    return "";
}


/*
 * ============================================================
 * PHYSICAL DESCRIPTION
 * ============================================================
 */

function parsePhysicalDescription(text) {

    const value =
        normalizeText(text);

    const match =
        value.match(
            /(?:—|–|-)\s*([^—]+?\b(?:с\.|стр\.|p\.|pages|л\.|экз\.|диск|диска|CD|DVD|опт\.?\s*диск)\b[^—]*)$/iu
        );

    return match
        ? cleanValue(match[1])
        : "";
}


/*
 * ============================================================
 * PUBLICATION
 * ============================================================
 */

function parsePublicationArea(text) {

    const value =
        normalizeText(text);

    const result = {

        place: "",
        publisher: "",
        year: ""
    };

    const match =
        value.match(
            /(?:—|–|-)\s*([^:—]+?)\s*:\s*([^,—]+?)\s*,\s*(?:\[?)(1[5-9]\d{2}|20\d{2}|21\d{2})(?:\]?)/iu
        );

    if (match) {

        result.place =
            cleanValue(match[1]);

        result.publisher =
            cleanValue(match[2]);

        result.year =
            match[3];
    }

    return result;
}


/*
 * ============================================================
 * YEAR
 * ============================================================
 */

function parseYear(text) {

    const matches =
        [
            ...normalizeText(text)
                .matchAll(
                    /\b(1[5-9]\d{2}|20\d{2}|21\d{2})\b/g
                )
        ];

    if (!matches.length) {
        return "";
    }

    return matches[
        matches.length - 1
    ][1];
}


/*
 * ============================================================
 * ORGANIZATION
 * ============================================================
 */

function parseOrganization(text) {

    const value =
        normalizeText(text);

    const match =
        value.match(
            /;\s*([^.—]+?)(?=\s*[.—]|$)/
        );

    if (!match) {
        return "";
    }

    const organization =
        cleanValue(match[1]);

    if (
        !organization ||
        /^\d/.test(organization)
    ) {
        return "";
    }

    return organization.length > 2
        ? organization
        : "";
}


/*
 * ============================================================
 * COLLECT PERSONS
 * ============================================================
 */

function collectResponsibilityPersons(parsed) {

    const persons = [];

    if (!parsed) {
        return persons;
    }

    if (
        parsed.initialAuthor
    ) {

        persons.push({

            person:
                parsed.initialAuthor,

            role: "author",

            roleCode: "",

            source: "leading"
        });
    }

    if (
        Array.isArray(
            parsed.titleParts
        )
    ) {

        parsed.titleParts.forEach(
            part => {

                if (
                    !part ||
                    !part.responsibility
                ) {
                    return;
                }

                const entries =
                    parseResponsibilityPersons(
                        part.responsibility
                    );

                entries.forEach(
                    entry => {

                        persons.push({

                            person:
                                entry.person,

                            role:
                                entry.role,

                            roleCode:
                                entry.roleCode,

                            source:
                                "responsibility"
                        });
                    }
                );
            }
        );
    }

    const unique = [];
    const seen = new Set();

    persons.forEach(
        entry => {

            const key =
                [
                    entry.role,
                    entry.person.surname
                        .toLowerCase(),

                    entry.person.initials
                        .toLowerCase()
                ].join("|");

            if (
                seen.has(key)
            ) {
                return;
            }

            seen.add(key);
            unique.push(entry);
        }
    );

    return unique;
}


/*
 * ============================================================
 * MAIN PARSER
 * ============================================================
 */

function parseBibliographicDescription(text) {

    const original =
        normalizeText(text);

    const result = {

        original,

        title: "",

        titleParts: [],

        subtitle: "",

        author: "",

        authorSurname: "",

        authorInitials: "",

        responsibility: "",

        organization: "",

        place: "",

        publisher: "",

        year: "",

        physical: "",

        isbn: "",

        subjects: [],

        language: "rus",

        country: "",

        udc: "",

        notes: "",

        initialAuthor: null,

        persons: []
    };

    if (!original) {
        return result;
    }

    result.isbn =
        parseISBN(original);

    result.udc =
        parseUDC(original);

    result.language =
        detectLanguage(original);

    result.country =
        detectCountry(original);

    result.physical =
        parsePhysicalDescription(original);

    const publication =
        parsePublicationArea(original);

    result.place =
        publication.place;

    result.publisher =
        publication.publisher;

    result.year =
        publication.year ||
        parseYear(original);

    const initialAuthor =
        parseInitialAuthor(original);

    if (initialAuthor) {

        result.initialAuthor =
            initialAuthor;

        result.author =
            initialAuthor.display;

        result.authorSurname =
            initialAuthor.surname;

        result.authorInitials =
            initialAuthor.initials;
    }

    result.organization =
        parseOrganization(original);

    result.titleParts =
        parseTitleArea(original);

    if (
        result.titleParts.length
    ) {

        const first =
            result.titleParts[0];

        result.title =
            first.title;

        result.subtitle =
            first.relatedTitles.join(
                " : "
            );

        result.responsibility =
            first.responsibility;
    }

    if (
        !result.author &&
        result.titleParts.length
    ) {

        const first =
            result.titleParts[0];

        const persons =
            parseResponsibilityPersons(
                first.responsibility
            );

        const authors =
            persons.filter(
                item =>
                    item.role === "author"
            );

        if (
            authors.length
        ) {

            const firstAuthor =
                authors[0].person;

            result.author =
                firstAuthor.display;

            result.authorSurname =
                firstAuthor.surname;

            result.authorInitials =
                firstAuthor.initials;
        }
    }

    if (
        /учебн(ое|ый|ая)\s+пособ/i
            .test(original)
    ) {

        result.notes =
            "Учебное пособие";
    }

    if (
        /монограф/i.test(original)
    ) {

        result.notes =
            "Монография";
    }

    if (
        /диссертац/i.test(original)
    ) {

        result.notes =
            "Диссертация";
    }

    result.persons =
        collectResponsibilityPersons(
            result
        );

    return result;
}


/*
 * ============================================================
 * FIELD 200
 * ============================================================
 */

function buildField200(parsed) {

    if (
        !parsed ||
        !Array.isArray(
            parsed.titleParts
        ) ||
        !parsed.titleParts.length
    ) {
        return null;
    }

    let value = "1#";

    parsed.titleParts.forEach(
        (part, index) => {

            if (!part.title) {
                return;
            }

            if (index === 0) {

                value +=
                    `$a${part.title}`;

            } else {

                value +=
                    `$c${part.title}`;
            }

            if (
                Array.isArray(
                    part.relatedTitles
                )
            ) {

                part.relatedTitles
                    .forEach(
                        related => {

                            if (!related) {
                                return;
                            }

                            value +=
                                `$e${related}`;
                        }
                    );
            }

            if (
                part.responsibility
            ) {

                value +=
                    `$f${part.responsibility}`;
            }
        }
    );

    return {

        tag: "200",

        value
    };
}


/*
 * ============================================================
 * PERSON FIELD VALUE
 * ============================================================
 */

function buildPersonFieldValue(
    person,
    indicators,
    roleCode
) {

    if (
        !person ||
        !person.surname
    ) {
        return "";
    }

    let value =
        indicators || "#1";

    value +=
        `$a${person.surname}`;

    if (
        person.initials
    ) {

        value +=
            `$b${person.initials}`;
    }

    if (
        roleCode
    ) {

        value +=
            `$4${roleCode}`;
    }

    return value;
}


/*
 * ============================================================
 * 700 / 701 / 702
 * ============================================================
 */

function buildFields700701702(parsed) {

    const fields = [];

    if (
        !parsed ||
        !Array.isArray(parsed.persons)
    ) {
        return fields;
    }

    const authors =
        parsed.persons.filter(
            item =>
                item &&
                item.role === "author" &&
                item.person &&
                item.person.surname
        );

    const nonAuthors =
        parsed.persons.filter(
            item =>
                item &&
                item.role !== "author" &&
                item.person &&
                item.person.surname
        );

    if (
        authors.length === 1
    ) {

        fields.push({

            tag: "700",

            value:
                buildPersonFieldValue(
                    authors[0].person,
                    "#1",
                    ""
                )
        });

    } else if (
        authors.length >= 2 &&
        authors.length <= 3
    ) {

        fields.push({

            tag: "700",

            value:
                buildPersonFieldValue(
                    authors[0].person,
                    "#1",
                    ""
                )
        });

        authors
            .slice(1)
            .forEach(
                entry => {

                    fields.push({

                        tag: "701",

                        value:
                            buildPersonFieldValue(
                                entry.person,
                                "#1",
                                ""
                            )
                    });
                }
            );

    } else if (
        authors.length >= 4
    ) {

        authors.forEach(
            entry => {

                fields.push({

                    tag: "701",

                    value:
                        buildPersonFieldValue(
                            entry.person,
                            "#1",
                            ""
                        )
                });
            }
        );
    }

    nonAuthors.forEach(
        entry => {

            fields.push({

                tag: "702",

                value:
                    buildPersonFieldValue(
                        entry.person,
                        "#1",
                        entry.roleCode
                    )
            });
        }
    );

    return fields;
}


/*
 * ============================================================
 * FIELD 304
 * ============================================================
 */

function buildField304(parsed) {

    if (
        !parsed ||
        !Array.isArray(
            parsed.titleParts
        )
    ) {
        return null;
    }

    const hasEtAlResponsibility =
        parsed.titleParts.some(
            part =>
                part &&
                part.responsibility &&
                hasEtAl(
                    part.responsibility
                )
        );

    if (
        !hasEtAlResponsibility
    ) {
        return null;
    }

    const authors =
        Array.isArray(
            parsed.persons
        )
            ? parsed.persons.filter(
                item =>
                    item.role === "author"
            )
            : [];

    if (
        !authors.length
    ) {
        return null;
    }

    return {

        tag: "304",

        value:
            `##$aУстановлено авторов: ${authors.length}; ` +
            `в описании указано «и др.»`
    };
}


/*
 * ============================================================
 * BASE BELMARC FIELDS
 * ============================================================
 */

function buildBaseBelmarcFields(parsed) {

    const fields = [];

    const id =
        recordId.value.trim() ||
        `AUTO-${Date.now()}`;

    fields.push({

        tag: "001",

        value: id
    });

    fields.push({

        tag: "003",

        value: "BELMARC"
    });

    fields.push({

        tag: "005",

        value:
            new Date()
                .toISOString()
                .replace(
                    /\.\d{3}Z$/,
                    "Z"
                )
    });

    fields.push({

        tag: "101",

        value:
            `0#$a${
                parsed.language ||
                language.value ||
                "rus"
            }`
    });

    if (
        parsed.country ||
        country.value.trim()
    ) {

        fields.push({

            tag: "102",

            value:
                `##$a${
                    parsed.country ||
                    country.value.trim()
                }`
        });
    }

    if (parsed.isbn) {

        fields.push({

            tag: "010",

            value:
                `##$a${parsed.isbn}`
        });
    }

    const field200 =
        buildField200(parsed);

    if (field200) {

        fields.push(
            field200
        );
    }

    if (
        parsed.place ||
        parsed.publisher ||
        parsed.year
    ) {

        let value =
            "##";

        if (parsed.place) {

            value +=
                `$a${parsed.place}`;
        }

        if (parsed.publisher) {

            value +=
                `$c${parsed.publisher}`;
        }

        if (parsed.year) {

            value +=
                `$d${parsed.year}`;
        }

        fields.push({

            tag: "210",

            value
        });
    }

    if (parsed.physical) {

        fields.push({

            tag: "215",

            value:
                `##$a${parsed.physical}`
        });
    }

    if (
        /библиограф/i.test(
            freeDesc.value
        )
    ) {

        fields.push({

            tag: "320",

            value:
                "##$aБиблиография"
        });
    }

    if (parsed.udc) {

        fields.push({

            tag: "675",

            value:
                `##$a${parsed.udc}$2rubbk`
        });
    }

    const responsibilityFields =
        buildFields700701702(
            parsed
        );

    responsibilityFields.forEach(
        field => {

            fields.push(field);
        }
    );

    const field304 =
        buildField304(parsed);

    if (field304) {

        fields.push(
            field304
        );
    }

    const sourceCountry =
        parsed.country ||
        country.value.trim() ||
        "BY";

    fields.push({

        tag: "801",

        value:
            `#0$a${sourceCountry}$gpsbo`
    });

    fields.push({

        tag: "999",

        value:
            `##$a${
                cataloguer.value.trim() ||
                "библиограф"
            }`
    });

    return fields;
}


/*
 * ============================================================
 * FINAL FIELDS
 * ============================================================
 */

function getFinalFields(parsed) {

    const base =
        buildBaseBelmarcFields(
            parsed
        );

    const systemTags =
        new Set([
            "001",
            "003",
            "005"
        ]);

    const result =
        base.filter(
            field =>
                systemTags.has(
                    field.tag
                )
        );

    dynamicFields.forEach(
        field => {

            const tag =
                String(
                    field.tag || ""
                ).trim();

            const value =
                String(
                    field.value || ""
                ).trim();

            if (
                !/^\d{3}$/.test(tag)
            ) {
                return;
            }

            if (!value) {
                return;
            }

            result.push({

                tag,

                value
            });
        }
    );

    return result;
}


/*
 * ============================================================
 * BELMARC TEXT
 * ============================================================
 */

function generateBelmarc(parsed) {

    const fields =
        getFinalFields(parsed);

    const lines = [];

    lines.push(
        "=LDR  00000nam a2200000 i 4500"
    );

    fields.forEach(
        field => {

            lines.push(
                `=${field.tag}  ${field.value}`
            );
        }
    );

    return lines.join("\n");
}


/*
 * ============================================================
 * MARCXML
 * ============================================================
 */

function belmarcToMarcXml(parsed) {

    const fields =
        getFinalFields(parsed);

    const parts = [];

    parts.push(
        '<?xml version="1.0" encoding="UTF-8"?>'
    );

    parts.push(
        '<record xmlns="http://www.loc.gov/MARC21/slim">'
    );

    parts.push(
        '<leader>00000nam a2200000 i 4500</leader>'
    );

    fields.forEach(
        field => {

            if (
                [
                    "001",
                    "003",
                    "005"
                ].includes(
                    field.tag
                )
            ) {

                parts.push(
                    `<controlfield tag="${field.tag}">${
                        escapeXml(
                            field.value
                        )
                    }</controlfield>`
                );

                return;
            }

            const match =
                field.value.match(
                    /^(.{2})(.*)$/
                );

            const indicators =
                match
                    ? match[1]
                    : "  ";

            const subfields =
                match
                    ? match[2]
                    : field.value;

            const subs = [];

            const regex =
                /\$([a-z0-9])([^$]*)/gi;

            let m;

            while (
                (m = regex.exec(
                    subfields
                )) !== null
            ) {

                subs.push(
                    `<subfield code="${escapeXml(
                        m[1]
                    )}">${escapeXml(
                        m[2]
                    )}</subfield>`
                );
            }

            parts.push(
                `<datafield tag="${field.tag}" ` +
                `ind1="${escapeXml(
                    indicators.charAt(0) || " "
                )}" ` +
                `ind2="${escapeXml(
                    indicators.charAt(1) || " "
                )}">` +
                `${subs.join("")}` +
                `</datafield>`
            );
        }
    );

    parts.push(
        "</record>"
    );

    return parts.join("\n");
}


/*
 * ============================================================
 * VISUAL CATALOG CARD
 * ============================================================
 */

function getCardAuthors(parsed) {

    if (
        !parsed ||
        !Array.isArray(parsed.persons)
    ) {
        return [];
    }

    const result = [];
    const seen = new Set();

    parsed.persons.forEach(
        entry => {

            if (
                !entry ||
                !entry.person ||
                !entry.person.display
            ) {
                return;
            }

            const key =
                [
                    entry.person.surname,
                    entry.person.initials,
                    entry.role
                ]
                .join("|")
                .toLowerCase();

            /*
             * Защита от дублирования одного
             * и того же лица на карточке.
             */
            if (seen.has(key)) {
                return;
            }

            seen.add(key);

            result.push({
                display:
                    entry.person.display,

                role:
                    entry.role || "author"
            });
        }
    );

    return result;
}


/*
 * ============================================================
 * АВТОРСКИЙ ЗНАК
 * ============================================================
 */

function getAuthorMark(parsed) {

    if (
        !parsed ||
        !parsed.authorSurname
    ) {
        return "";
    }

    const surname =
        normalizeText(
            parsed.authorSurname
        );

    if (!surname) {
        return "";
    }

    /*
     * Простейший библиотечный авторский знак:
     * первая буква фамилии + условные
     * первые две буквы фамилии.
     *
     * Например:
     * Колас → Кол
     * Маўр → Маў
     */
    const letters =
        surname
            .replace(
                /[^А-ЯЁІЎA-ZА-Яа-яёіўa-z]/gu,
                ""
            );

    if (!letters) {
        return "";
    }

    if (letters.length >= 3) {

        return (
            letters.charAt(0).toUpperCase() +
            letters.slice(1, 3).toLowerCase()
        );
    }

    return letters
        .toUpperCase();
}


/*
 * ============================================================
 * ЗАГОЛОВОК ЗАПИСИ
 * ============================================================
 */

function getCardRecordHeading(parsed) {

    if (
        !parsed ||
        !parsed.author
    ) {
        return "";
    }

    return parsed.author;
}


/*
 * ============================================================
 * ОСНОВНОЕ ЗАГЛАВИЕ
 * ============================================================
 */

function getCardMainTitle(parsed) {

    if (
        !parsed ||
        !Array.isArray(parsed.titleParts)
    ) {
        return "";
    }

    const first =
        parsed.titleParts[0];

    if (
        !first
    ) {
        return "";
    }

    return first.title || "";
}


/*
 * ============================================================
 * СВЕДЕНИЯ, ОТНОСЯЩИЕСЯ К ЗАГЛАВИЮ
 * ============================================================
 */

function getCardRelatedTitle(parsed) {

    if (
        !parsed ||
        !Array.isArray(parsed.titleParts)
    ) {
        return "";
    }

    const first =
        parsed.titleParts[0];

    if (
        !first ||
        !Array.isArray(first.relatedTitles)
    ) {
        return "";
    }

    return first.relatedTitles
        .filter(Boolean)
        .join(" : ");
}


/*
 * ============================================================
 * ПОСЛЕДУЮЩИЕ ЗАГЛАВИЯ
 * ============================================================
 */

function getCardAdditionalTitles(parsed) {

    if (
        !parsed ||
        !Array.isArray(parsed.titleParts) ||
        parsed.titleParts.length <= 1
    ) {
        return [];
    }

    return parsed.titleParts
        .slice(1)
        .filter(
            part =>
                part &&
                part.title
        )
        .map(
            part => {

                const related =
                    Array.isArray(
                        part.relatedTitles
                    )
                        ? part.relatedTitles
                            .filter(Boolean)
                            .join(" : ")
                        : "";

                return {
                    title:
                        part.title,

                    related
                };
            }
        );
}


/*
 * ============================================================
 * СВЕДЕНИЯ ОБ ОТВЕТСТВЕННОСТИ
 * ============================================================
 */

function getCardResponsibility(parsed) {

    const authors =
        getCardAuthors(parsed);

    if (!authors.length) {
        return "";
    }

    const parts =
        authors.map(
            entry => {

                if (
                    entry.role === "author"
                ) {
                    return entry.display;
                }

                const roleNames = {

                    editor:
                        "редактор",

                    compiler:
                        "составитель",

                    translator:
                        "переводчик",

                    illustrator:
                        "иллюстратор",

                    photographer:
                        "фотограф",

                    other:
                        ""
                };

                const roleName =
                    roleNames[
                        entry.role
                    ] || "";

                return roleName
                    ? `${entry.display} (${roleName})`
                    : entry.display;
            }
        );

    return parts.join("; ");
}


/*
 * ============================================================
 * ИЗДАНИЕ
 * ============================================================
 */

function getCardEdition(parsed) {

    if (!parsed) {
        return "";
    }

    /*
     * В текущем парсере отдельное поле
     * для 205 пока не формируется.
     *
     * Если в исходном описании есть
     * "2-е изд.", "3-е изд." и т.п.,
     * показываем это как сведения об издании.
     */
    const original =
        parsed.original || "";

    const match =
        original.match(
            /\b(\d+(?:-е|-я|-й|-ое|-ая|-ый)?\s+изд(?:ание|\.?))\b/iu
        );

    return match
        ? cleanValue(match[1])
        : "";
}


/*
 * ============================================================
 * ПУБЛИКАЦИЯ
 * ============================================================
 */

function getCardPublication(parsed) {

    if (!parsed) {
        return "";
    }

    const parts = [];

    if (parsed.place) {
        parts.push(
            parsed.place
        );
    }

    if (parsed.publisher) {
        parts.push(
            parsed.publisher
        );
    }

    if (parsed.year) {
        parts.push(
            parsed.year
        );
    }

    if (!parts.length) {
        return "";
    }

    /*
     * Традиционная форма:
     *
     * Место : Издатель, год
     */
    let result = "";

    if (parsed.place) {

        result +=
            parsed.place;
    }

    if (parsed.publisher) {

        result +=
            result
                ? ` : ${parsed.publisher}`
                : parsed.publisher;
    }

    if (parsed.year) {

        result +=
            result
                ? `, ${parsed.year}`
                : parsed.year;
    }

    return result;
}


/*
 * ============================================================
 * ФИЗИЧЕСКОЕ ОПИСАНИЕ
 * ============================================================
 */

function getCardPhysical(parsed) {

    if (
        !parsed ||
        !parsed.physical
    ) {
        return "";
    }

    return cleanValue(
        parsed.physical
    );
}


/*
 * ============================================================
 * ISBN
 * ============================================================
 */

function getCardISBN(parsed) {

    if (
        !parsed ||
        !parsed.isbn
    ) {
        return "";
    }

    return parsed.isbn;
}


/*
 * ============================================================
 * АННОТАЦИЯ
 * ============================================================
 */

function getCardAnnotation(parsed) {

    if (!parsed) {
        return "";
    }

    /*
     * Сейчас отдельное поле аннотации
     * в парсере отсутствует.
     *
     * Поэтому не подставляем сюда произвольные
     * данные и не создаём ложную аннотацию.
     */
    return "";
}


/*
 * ============================================================
 * ПРЕДМЕТНЫЕ РУБРИКИ
 * ============================================================
 */

function getCardSubjects(parsed) {

    if (
        !parsed ||
        !Array.isArray(parsed.subjects)
    ) {
        return [];
    }

    return parsed.subjects
        .map(cleanValue)
        .filter(Boolean);
}


/*
 * ============================================================
 * УДК
 * ============================================================
 */

function getCardUDC(parsed) {

    if (
        !parsed ||
        !parsed.udc
    ) {
        return "";
    }

    return parsed.udc;
}


/*
 * ============================================================
 * ББК
 * ============================================================
 *
 * В текущем парсере ББК не распознаётся отдельно.
 * Проверяем исходный текст, чтобы не ломать существующую
 * структуру данных.
 * ============================================================
 */

function getCardBBK(parsed) {

    if (!parsed) {
        return "";
    }

    const text =
        parsed.original || "";

    const match =
        text.match(
            /(?:ББК|BBK)\s*[:\-]?\s*([0-9А-Яа-яA-Za-z.\-:()]+)/iu
        );

    return match
        ? cleanValue(match[1])
        : "";
}


/*
 * ============================================================
 * СЕРИЯ
 * ============================================================
 */

function getCardSeries(parsed) {

    if (!parsed) {
        return "";
    }

    const text =
        parsed.original || "";

    /*
     * Ищем классическую конструкцию:
     *
     * — (Название серии)
     */
    const match =
        text.match(
            /—\s*\(([^)]+)\)/u
        );

    return match
        ? cleanValue(match[1])
        : "";
}


/*
 * ============================================================
 * ТИП ИЗДАНИЯ
 * ============================================================
 */

function getCardType(parsed) {

    if (!parsed) {
        return "Библиографическое описание";
    }

    if (parsed.notes) {
        return parsed.notes;
    }

    if (
        /электронн/i.test(
            parsed.original || ""
        )
    ) {
        return "Электронный ресурс";
    }

    if (
        /диссертац/i.test(
            parsed.original || ""
        )
    ) {
        return "Диссертация";
    }

    if (
        /карта|атлас/i.test(
            parsed.original || ""
        )
    ) {
        return "Картографическое издание";
    }

    return "Библиографическое описание";
}


/*
 * ============================================================
 * РЕНДЕР КАРТОЧКИ
 * ============================================================
 */

function renderCatalogCard(parsed) {

    if (!catalogCard) {
        return;
    }

    /*
     * EMPTY
     */

    if (
        !parsed ||
        !parsed.original
    ) {

        catalogCard.innerHTML = `
            <div class="catalog-card-empty">

                <div class="empty-icon">
                    ▤
                </div>

                <strong>
                    Карточка появится после распознавания
                </strong>

                <span>
                    Введите библиографическое описание выше
                    и нажмите «Распознать описание».
                </span>

            </div>
        `;

        return;
    }


    /*
     * Данные карточки.
     */

    const authorMark =
        getAuthorMark(parsed);

    const recordHeading =
        getCardRecordHeading(parsed);

    const mainTitle =
        getCardMainTitle(parsed);

    const relatedTitle =
        getCardRelatedTitle(parsed);

    const additionalTitles =
        getCardAdditionalTitles(parsed);

    const responsibility =
        getCardResponsibility(parsed);

    const edition =
        getCardEdition(parsed);

    const publication =
        getCardPublication(parsed);

    const physical =
        getCardPhysical(parsed);

    const series =
        getCardSeries(parsed);

    const isbn =
        getCardISBN(parsed);

    const annotation =
        getCardAnnotation(parsed);

    const subjects =
        getCardSubjects(parsed);

    const udc =
        getCardUDC(parsed);

    const bbk =
        getCardBBK(parsed);

    const type =
        getCardType(parsed);


    /*
     * Дополнительные заглавия.
     */

    const additionalTitlesHtml =
        additionalTitles
            .map(
                item => `
                    <div class="catalog-card-area">

                        <span class="catalog-card-area-label">
                            Последующее заглавие
                        </span>

                        <div class="catalog-card-area-value">

                            <strong>
                                ${escapeHtml(
                                    item.title
                                )}
                            </strong>

                            ${
                                item.related
                                    ? `
                                        :
                                        ${escapeHtml(
                                            item.related
                                        )}
                                    `
                                    : ""
                            }

                        </div>

                    </div>
                `
            )
            .join("");


    /*
     * Рубрики.
     */

    const subjectsHtml =
        subjects.length
            ? `
                <div class="catalog-card-subjects">

                    <span class="catalog-card-index-label">
                        Предметные рубрики
                    </span>

                    ${subjects
                        .map(
                            subject => `
                                <span class="catalog-card-subject">
                                    ${escapeHtml(
                                        subject
                                    )}
                                </span>
                            `
                        )
                        .join("")}

                </div>
            `
            : "";


    /*
     * Индексы.
     */

    const indexesHtml =
        (udc || bbk)
            ? `
                <div class="catalog-card-indexes">

                    ${
                        udc
                            ? `
                                <div class="catalog-card-index">

                                    <span class="catalog-card-index-label">
                                        Индекс УДК
                                    </span>

                                    <div class="catalog-card-index-value">
                                        ${escapeHtml(
                                            udc
                                        )}
                                    </div>

                                </div>
                            `
                            : ""
                    }

                    ${
                        bbk
                            ? `
                                <div class="catalog-card-index">

                                    <span class="catalog-card-index-label">
                                        Индекс ББК
                                    </span>

                                    <div class="catalog-card-index-value">
                                        ${escapeHtml(
                                            bbk
                                        )}
                                    </div>

                                </div>
                            `
                            : ""
                    }

                </div>
            `
            : "";


    /*
     * Публикационная область.
     *
     * Здесь данные собираются в одну строку,
     * как в библиографическом описании.
     */

    const publicationLine =
        [
            edition,
            publication
        ]
        .filter(Boolean)
        .join(" / ");


    /*
     * Физическая характеристика.
     */

    const physicalHtml =
        physical
            ? `
                <span class="catalog-card-physical">
                    — ${escapeHtml(
                        physical
                    )}
                </span>
            `
            : "";


    /*
     * Серия.
     */

    const seriesHtml =
        series
            ? `
                <div class="catalog-card-area">

                    <span class="catalog-card-area-label">
                        Серия
                    </span>

                    <div class="catalog-card-area-value">
                        ${escapeHtml(
                            series
                        )}
                    </div>

                </div>
            `
            : "";


    /*
     * Аннотация.
     */

    const annotationHtml =
        annotation
            ? `
                <div class="catalog-card-annotation">

                    <span class="catalog-card-area-label">
                        Аннотация
                    </span>

                    ${escapeHtml(
                        annotation
                    )}

                </div>
            `
            : "";


    /*
     * ISBN.
     */

    const isbnHtml =
        isbn
            ? `
                <div class="catalog-card-isbn">

                    <span class="catalog-card-isbn-label">
                        ISBN
                    </span>

                    ${escapeHtml(
                        isbn
                    )}

                </div>
            `
            : "";


    /*
     * Заголовок записи.
     */

    const recordHeadingHtml =
        recordHeading
            ? `
                <div class="catalog-card-record-heading">

                    <span class="record-author">
                        ${escapeHtml(
                            recordHeading
                        )}
                    </span>

                </div>
            `
            : "";


    /*
     * Формируем карточку.
     *
     * Здесь каждый элемент выводится только один раз.
     */

    catalogCard.innerHTML = `

        <div class="catalog-card-content">

            <div class="catalog-card-topline">

                <span>
                    ${escapeHtml(type)}
                </span>

                <span>
                    BELMARC
                </span>

            </div>


            ${
                authorMark
                    ? `
                        <div class="catalog-card-author-mark">
                            ${escapeHtml(
                                authorMark
                            )}
                        </div>
                    `
                    : ""
            }


            ${recordHeadingHtml}


            <div class="catalog-card-description">

                ${
                    mainTitle
                        ? `
                            <span class="catalog-card-main-title">
                                ${escapeHtml(
                                    mainTitle
                                )}
                            </span>
                        `
                        : ""
                }


                ${
                    relatedTitle
                        ? `
                            :
                            <span class="catalog-card-related-title">
                                ${escapeHtml(
                                    relatedTitle
                                )}
                            </span>
                        `
                        : ""
                }


                ${
                    responsibility
                        ? `
                            /
                            <span class="catalog-card-responsibility">
                                ${escapeHtml(
                                    responsibility
                                )}
                            </span>
                        `
                        : ""
                }


                ${
                    publicationLine
                        ? `
                            . —
                            <span class="catalog-card-publication">
                                ${escapeHtml(
                                    publicationLine
                                )}
                            </span>
                        `
                        : ""
                }


                ${
                    physicalHtml
                        ? `
                            ${physicalHtml}
                        `
                        : ""
                }

                ${
                    seriesHtml
                        ? `
                            ${seriesHtml}
                        `
                        : ""
                }

            </div>


            ${additionalTitlesHtml}


            ${isbnHtml}


            ${annotationHtml}


            ${subjectsHtml}


            ${indexesHtml}


            <div class="catalog-card-bottom">

                <span>
                    Предварительная библиографическая карточка
                </span>

                <span>
                    ${escapeHtml(
                        parsed.year || ""
                    )}
                </span>

            </div>

        </div>
    `;
}

/*
 * ============================================================
 * OUTPUT
 * ============================================================
 */

function updateOutput() {

    if (!parsedRecord) {

        parsedRecord =
            parseBibliographicDescription(
                freeDesc.value
            );
    }

    if (
        outputFormat.value ===
        "marcxml"
    ) {

        output.value =
            belmarcToMarcXml(
                parsedRecord
            );

    } else {

        output.value =
            generateBelmarc(
                parsedRecord
            );
    }

    /*
     * Одновременно обновляем визуальную карточку.
     */

    renderCatalogCard(
        parsedRecord
    );
}


/*
 * ============================================================
 * PARSE INPUT
 * ============================================================
 */

function parseInput() {

    const text =
        freeDesc.value.trim();

    if (!text) {

        parsedRecord = null;

        dynamicFields = [];

        renderDynamicFields();

        parseStatus.textContent =
            "Введите библиографическое описание.";

        parseStatus.className =
            "status warning";

        updateOutput();

        return;
    }

    parsedRecord =
        parseBibliographicDescription(
            text
        );

    language.value =
        parsedRecord.language ||
        "rus";

    if (
        parsedRecord.country
    ) {

        country.value =
            parsedRecord.country;
    }

    const generated =
        buildBaseBelmarcFields(
            parsedRecord
        );

    dynamicFields =
        generated
            .filter(
                field =>
                    ![
                        "001",
                        "003",
                        "005"
                    ].includes(
                        field.tag
                    )
            )
            .map(
                field => ({
                    tag: field.tag,
                    value: field.value
                })
            );

    renderDynamicFields();

    updateOutput();

    const recognized = [];

    if (
        parsedRecord.titleParts.length
    ) {

        recognized.push(
            `заглавий: ${parsedRecord.titleParts.length}`
        );
    }

    if (
        parsedRecord.author
    ) {

        recognized.push(
            "автор"
        );
    }

    if (
        Array.isArray(
            parsedRecord.persons
        ) &&
        parsedRecord.persons.length
    ) {

        recognized.push(
            `лиц ответственности: ${parsedRecord.persons.length}`
        );
    }

    if (
        parsedRecord.place
    ) {

        recognized.push(
            "место"
        );
    }

    if (
        parsedRecord.publisher
    ) {

        recognized.push(
            "издатель"
        );
    }

    if (
        parsedRecord.year
    ) {

        recognized.push(
            "год"
        );
    }

    if (
        parsedRecord.physical
    ) {

        recognized.push(
            "физическое описание"
        );
    }

    if (
        parsedRecord.isbn
    ) {

        recognized.push(
            "ISBN"
        );
    }

    if (
        parsedRecord.udc
    ) {

        recognized.push(
            "УДК"
        );
    }

    if (recognized.length) {

        parseStatus.textContent =
            "Распознано: " +
            recognized.join(", ") +
            ".";

        parseStatus.className =
            "status success";

    } else {

        parseStatus.textContent =
            "Не удалось распознать структуру описания.";

        parseStatus.className =
            "status warning";
    }
}


/*
 * ============================================================
 * EXAMPLE BUTTON
 * ============================================================
 */

exampleBtn.addEventListener(
    "click",
    function () {

        freeDesc.value =
            EXAMPLE;

        parseInput();

        freeDesc.focus();
    }
);


/*
 * ============================================================
 * PARSE BUTTON
 * ============================================================
 */

parseBtn.addEventListener(
    "click",
    parseInput
);


/*
 * ============================================================
 * AUTO UPDATE
 * ============================================================
 */

[
    recordId,
    language,
    country,
    cataloguer
].forEach(
    input => {

        if (!input) {
            return;
        }

        input.addEventListener(
            "input",
            function () {

                if (
                    parsedRecord
                ) {

                    parsedRecord.language =
                        language.value.trim();

                    parsedRecord.country =
                        country.value.trim();
                }

                updateOutput();
            }
        );
    }
);


outputFormat.addEventListener(
    "change",
    updateOutput
);


/*
 * ============================================================
 * ADD FIELD
 * ============================================================
 */

addFieldBtn.addEventListener(
    "click",
    function () {

        const tag =
            prompt(
                "Введите трёхзначный тег BELMARC, например 606:"
            );

        if (!tag) {
            return;
        }

        const normalizedTag =
            tag.trim();

        if (
            !/^\d{3}$/.test(
                normalizedTag
            )
        ) {

            alert(
                "Тег должен состоять ровно из трёх цифр."
            );

            return;
        }

        const value =
            prompt(
                `Введите индикаторы и подполя для ${normalizedTag}.\n\n` +
                `Например:\n` +
                `##$aНАУКА`
            );

        if (
            value === null
        ) {
            return;
        }

        addDynamicField(
            normalizedTag,
            value
        );
    }
);


/*
 * ============================================================
 * CLEAR
 * ============================================================
 */

clearBtn.addEventListener(
    "click",
    function () {

        freeDesc.value = "";

        recordId.value = "";

        language.value = "rus";

        country.value = "";

        cataloguer.value =
            "библиограф";

        parsedRecord = null;

        dynamicFields = [];

        renderDynamicFields();

        parseStatus.textContent =
            "";

        parseStatus.className =
            "status";

        updateOutput();
    }
);


/*
 * ============================================================
 * COPY
 * ============================================================
 */

copyBtn.addEventListener(
    "click",
    async function () {

        if (
            !output.value.trim()
        ) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                output.value
            );

            const oldText =
                copyBtn.textContent;

            copyBtn.textContent =
                "Скопировано ✓";

            setTimeout(
                () => {

                    copyBtn.textContent =
                        oldText;

                },
                1400
            );

        } catch (error) {

            output.focus();

            output.select();

            document.execCommand(
                "copy"
            );
        }
    }
);


/*
 * ============================================================
 * DOWNLOAD
 * ============================================================
 */

downloadBtn.addEventListener(
    "click",
    function () {

        if (
            !output.value.trim()
        ) {
            return;
        }

        const blob =
            new Blob(
                [output.value],
                {
                    type:
                        "text/plain;charset=utf-8"
                }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const a =
            document.createElement(
                "a"
            );

        a.href = url;

        a.download =
            outputFormat.value ===
            "belmarc"
                ? "belmarc-record.txt"
                : "marc-record.xml";

        document.body.appendChild(a);

        a.click();

        a.remove();

        URL.revokeObjectURL(
            url
        );
    }
);


/*
 * ============================================================
 * INITIALIZATION
 * ============================================================
 */

renderReference();

renderDynamicFields();

parsedRecord =
    parseBibliographicDescription(
        freeDesc.value
    );

updateOutput();

})();
