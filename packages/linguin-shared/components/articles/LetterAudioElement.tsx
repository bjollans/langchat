import { useRef } from "react";

export interface LetterAudioElement {
    letter: string;
}

export default function LetterAudioElement(props: LetterAudioElement) {


    const audioRef = useRef<HTMLAudioElement>(null);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const letterToAudioFile = {
        "अः": "5b2c53a6-0305-4db4-80a3-d0503e0382fc.mp3",
        "पृ": "7d924c7e-e61d-45b2-8da1-44d2ea9da441.mp3",
        "ब": "cb4bb4c8-3677-4e38-b1ce-c0e54e3e0989.mp3",
        "र्": "5d1d3471-d6ce-4d2e-a139-3d127408f95c.mp3",
        "न्क": "9db21bdd-e2cf-4ec6-b1e7-5db9f33385c5.mp3",
        "खुद": "6f07c62d-765d-4bac-9443-78c920073317.mp3",
        "भ": "f118ce4e-436a-465b-bd55-8ffd0383bd51.mp3",
        "श्र": "fbb4f3b9-f153-4156-a9e7-6d1fa8baa994.mp3",
        "पू": "1818cafa-f31a-42bd-aab8-87704f913d37.mp3",
        "अं": "e5dc6007-f386-4356-89a2-0b44449682cd.mp3",
        "पी": "ea3c9595-ff44-4ed6-956a-a573301ab9e2.mp3",
        "य": "f93ea955-43fb-43ef-9c92-2d5c8d84605e.mp3",
        "ढ़": "51ba89a5-f7db-4b9d-9eb3-b2c0b57f5812.mp3",
        "स": "8f3e58b4-8a1b-4121-9879-9ed4a3442c6a.mp3",
        "तो": "e86c6801-f455-4a74-a683-f38dac0775d3.mp3",
        "ह": "c3a24698-c051-4c7e-85f7-a7340918f38f.mp3",
        "म": "fd24416e-a394-413a-80a1-ae80a2bec5f4.mp3",
        "पु": "64a4e722-12d2-494c-8499-714cbb4cc700.mp3",
        "का": "43d39967-fb66-4944-8651-d0d637f6aeec.mp3",
        "न्": "6b53cf1a-52c1-42ed-b9bb-64d410ecf39e.mp3",
        "प": "f11a9e9f-252e-4318-8e5d-2157143d6fad.mp3",
        "फ": "5b192614-0bc6-44a7-a586-8662a9866a0b.mp3",
        "खरीदना": "dc8c54b8-21b4-4827-bfeb-f5d6cb624e95.mp3",
        "म्क": "4c11a88d-06a0-4e0d-8c65-adadebd0d959.mp3",
        "ग्क": "c9aa28d7-b4fc-4bd2-9c25-a0a2849d3aaa.mp3",
        "कि": "48fcb3ee-9cfe-4978-b17a-f1d33cbadc3e.mp3",
        "व्क": "f8f990ba-c179-4527-9da1-cce7a77118f6.mp3",
        "क्क": "a7b7ef87-8c01-44ef-a1fd-789194dabe09.mp3",
        "ब्क": "6c175e01-669f-4674-ac48-47a1b165493d.mp3",
        "त्": "1903b259-ea21-48a4-9b6f-677e4c41ea50.mp3",
        "न": "d763de65-5b55-43c2-9b34-c85cfe6bb072.mp3",
        "पे": "6baa6a62-f90b-4c1d-8a2d-6a66c5df08da.mp3",
        "कौ": "cdb02973-32fb-4286-8d5a-3c24485c5bcd.mp3",
        "फ्क": "a0129ce9-ae71-4689-a9d1-4ed6b51a8d4a.mp3",
        "र्क": "78f7003d-a5bd-4474-b08a-4d7bfbf8b112.mp3",
        "ङ": "c2242dcc-f57d-4fbb-b382-9c4a5d1060fb.mp3",
        "ए": "02258675-f858-445e-a3fb-b5189e39e5d8.mp3",
        "घ": "110e619f-7d8a-4b7c-a19e-1dc1152e3afd.mp3",
        "हॄॢॣॊ": "3e67eacd-cb19-4a09-b94e-130fc6cfed24.mp3",
        "ना": "d47acc7e-5c73-48a7-bd51-94b9aec326c7.mp3",
        "खु": "6bbc833c-94b5-45c0-90f1-ac4ea1056310.mp3",
        "क्": "f59379b5-f98d-469c-a220-716ede1bc133.mp3",
        "च": "c8777587-29a7-4d9b-b354-4d96256b3f6f.mp3",
        "कां": "b6c398f2-267b-4238-8ee4-5cce4820096f.mp3",
        "श्": "fdb4df5d-7bff-484a-b1e4-6fb42121b43f.mp3",
        "ता": "f708f1b4-0f6c-4e7c-910d-3f1f806cad8f.mp3",
        "छ": "88e59814-0bc1-4145-a9a3-eb9fa4c5fa6a.mp3",
        "क्र": "f4b3c380-75d4-4d74-8f72-b9e043019a29.mp3",
        "ल्क": "d27c6f9b-d570-48ce-ab1d-47d06189d995.mp3",
        "श्क": "ffe2e383-2ebd-4759-b9fb-86d65727103e.mp3",
        "ई": "5bd1460e-6b04-4b91-85fe-c2f8200f2d0d.mp3",
        "अदरक": "ff7af3e6-6cb7-42cd-b8fc-34dccbc3e015.mp3",
        "ट": "344f410d-c4d4-43a7-ac96-27162bb5dde1.mp3",
        "ञ": "7bdfc334-ec31-43b0-843a-df035b92c213.mp3",
        "उ": "069bac3b-ca3b-40c8-b7ad-ef538de23340.mp3",
        "को": "29e6136d-f1ad-4079-9c28-1c0ee2edb0af.mp3",
        "कॉ": "cd6010a7-9c18-4bfb-ad71-202a998ba65a.mp3",
        "क्ष": "70dd1808-b92f-4229-a8ca-08ca0623ed33.mp3",
        "म्": "fe82201d-f37e-4877-a2f0-c945c8bcb2f4.mp3",
        "ज": "2d3d000b-0d2c-432f-80cf-e4134ca4521c.mp3",
        "सी": "ce512976-5af7-4034-b6bd-f91465ed4b69.mp3",
        "झ": "68ed1110-fcf4-4882-8387-7e72dbb03d4c.mp3",
        "ऊ": "b69458ba-c57e-4130-919e-f99820290ef2.mp3",
        "ज्ञ": "78774b7e-f6b2-4f39-b5c8-ea39108ccadf.mp3",
        "कै": "241e6e26-e911-4b3b-a663-a4e7bdf51532.mp3",
        "ग्": "aaa4a058-78dc-47b8-b8eb-522399b504b6.mp3",
        "पा": "37aa34c1-f54f-4a7f-b51c-ee74d936dcb7.mp3",
        "इ": "b1a4bf2e-36d8-4d56-b820-561e1f918470.mp3",
        "स्क": "76e3332f-ee4a-46a3-8569-4fe185bc5870.mp3",
        "ऐ": "8812cede-6cb5-4ceb-9ca5-4c69fda921ce.mp3",
        "स्का": "1d235909-49a0-4b9b-af44-8609a8ea714e.mp3",
        "च्क": "98d3dd81-8941-480c-8aed-42df32cc33fd.mp3",
        "स्": "d5c930c6-c9e0-45bf-a2e8-d0fad1efe4a6.mp3",
        "आ": "dec7d216-e1d5-42de-9a90-8e1fd4a29daf.mp3",
        "पि": "7bcd90cb-1adb-4949-b8d7-52c5562b8774.mp3",
        "मी": "560f1788-9c2c-4ea6-8646-2daecbcc1b7a.mp3",
        "ज़": "202620ce-dfe3-4e86-988c-65a85d79681a.mp3",
        "ओ": "c2ff8159-d15d-442a-aa28-fa07fed3fdc7.mp3",
        "त्र": "9fd4fcd7-3676-4b4f-8d75-2c50e9522751.mp3",
        "अ": "aaa90c31-ea23-4d35-8c03-d0c670ed32c8.mp3",
        "के": "85358739-d901-46eb-a8ba-b2371082b7b4.mp3",
        "कृ": "dc72965d-c60e-419c-a145-77d76780b388.mp3",
        "कं": "a44b66e6-09ce-43a3-b7b9-28a15e9709e7.mp3",
        "ज्क": "2a6c2e9e-49d5-4f3e-a61b-4885e6121ca8.mp3",
        "फ़": "89f9164d-1d02-419b-94be-d6c8d7eb9830.mp3",
        "ख": "2ed2dc61-0287-4acc-acbd-b5dcde134679.mp3",
        "व्": "77b90e77-062e-4fdb-8804-a332e1b3acad.mp3",
        "आदमी": "520a0c7e-12b1-4d0f-9127-07d423927dd0.mp3",
        "ग": "181a96a0-0650-42de-904b-27ca6bd636f5.mp3",
        "च्": "78ae52c4-c856-4316-bd55-39abba4ac175.mp3",
        "कू": "7b112263-8a6c-413b-8784-993d68c1a48d.mp3",
        "की": "fcfa36f1-575f-495f-8554-aa1eb8bf1247.mp3",
        "कँ": "e323b330-94cb-426a-8fed-6dbd8ce31527.mp3",
        "क": "5889046b-be82-4491-9637-5ced4f8fd034.mp3",
        "औ": "b62a85e9-539a-4b04-ade2-3cc2e1293254.mp3",
        "तोता": "4618c0e8-d7e9-4174-aff2-678a97d9ef5f.mp3",
        "ब्": "da7aef71-f5e2-47dd-b759-f95693c2b394.mp3",
        "कु": "bf1cf5cc-84a9-4e3a-9f2b-9944aa48b399.mp3",
        "ल": "b30bae6a-5ef2-4387-8843-257c1381ee13.mp3",
        "थ": "53c6ccd2-4bdf-4adb-bfad-c4b47aad3431.mp3",
        "ल्": "cda9a26a-0daf-4a8c-b053-67b42f0b468b.mp3",
        "त": "21773821-b217-4c40-9a26-eab1fa5d834b.mp3",
        "पो": "7c19480a-a66d-4db6-9164-07ff495511a1.mp3",
        "ख़": "69827803-13b5-416b-bb4f-a4ed19461408.mp3",
        "फ्": "faf5e42b-1099-4e41-bd28-b4d3b78ef3fe.mp3",
        "कुरसी": "d363b8c0-988e-44de-a619-044e4feb4c33.mp3",
        "द": "317485e5-6962-4529-8732-b2057d655b15.mp3",
        "ध": "cf671121-473b-4a12-be5e-5d033fcfec45.mp3",
        "र": "af4f84e7-0e52-4e0f-accf-e60c5747d9de.mp3",
        "पै": "7b5b791e-1033-4aa8-a236-c6f984e00018.mp3",
        "पौ": "f00b1782-847b-4879-9613-842714819c43.mp3",
        "ड़": "772141d3-b6bf-4c77-899f-93d87cde22a0.mp3",
        "ण": "24f4a55b-55e6-4e90-926c-80160837bb49.mp3",
        "समझना": "3e34029c-cbaa-4d42-8a2e-1d01d0737dcd.mp3",
        "बचपन": "3f13cf14-3881-4691-8fb8-9c4978fa099d.mp3",
        "व": "6e014048-2ad1-473b-b5e0-2e4af28b8333.mp3",
        "ढ": "021d4e20-047c-4802-9240-f4f0151d6058.mp3",
        "सका": "09f24324-918e-458d-bfd7-502525fc8d15.mp3",
        "ठ": "69c5e38e-c0bb-4ec3-9e8a-39696c88f805.mp3",
        "ष": "31b4de2a-22b4-4070-bd2c-d9f3ac6a436c.mp3",
        "त्क": "20918a8b-4257-4d7d-8e90-5ca3752604d4.mp3",
        "काम": "adcc21b0-6c1b-4fff-9aa2-25c37537cbc2.mp3",
        "री": "b7ffcca7-1359-4de7-9548-3ed7347ee585.mp3",
        "श": "9a94c786-931c-423e-8f85-6ef57e8037a1.mp3",
        "ड": "9e086181-d605-442f-8133-755ef70086f5.mp3",
        "ज्": "ddea4bda-1dcf-4035-b623-09540aa5bd12.mp3",
    };

    const audioSrc = `https://backend.linguin.co/storage/v1/object/public/letterSound/devanagri/${letterToAudioFile[props.letter]}`;

    return (<span
        className=" cursor-pointer text-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 hover:text-sky-400"
        onClick={play}>
        <audio ref={audioRef}>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        {props.letter}
    </span>);
}