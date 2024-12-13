interface Window {
    SpeechRecognition: any; // or use the specific type if known
    webkitSpeechRecognition: any; // or use the specific type if known
}

interface SpeechRecognition {
    new (): SpeechRecognition;
    // Add other properties and methods as needed
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onstart: () => void; 
    onresult: (event: SpeechRecognitionEvent) => void; // Add this line with the correct type
    onerror: (event: any) => void; // Add other event handlers as needed
    onend: () => void; // Add other event handlers as needed
}
    // Add other methods and events as needed