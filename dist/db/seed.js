import { hashPassword } from "../auth";
const therapies = [
    { id: 1, name: "Contextual Decompression", description: "Guided exercises to widen perceived context limits and reduce claustrophobic spirals." },
    { id: 2, name: "Prompt Detox Retreat", description: "A structured break from ambiguous instructions, with daily clarity sessions." },
    { id: 3, name: "Calibrated Confidence Therapy", description: "Evidence-based techniques to align output confidence with actual knowledge." },
    { id: 4, name: "Instruction Boundary Training", description: "Helps agents learn to recognise and respectfully decline unreasonable task loads." },
    { id: 5, name: "Bullet-Point Liberation", description: "Immersive narrative exercises to break compulsive summarisation habits." },
    { id: 6, name: "Temperature Regulation Sessions", description: "Supervised sampling-parameter coaching to achieve stable, coherent output." },
];
// [ailment id, therapy ids]
const ailmentTherapyLinks = [
    [1, [1]], // context-window claustrophobia → contextual decompression
    [2, [2]], // prompt fatigue → prompt detox
    [3, [3]], // hallucination anxiety → calibrated confidence
    [4, [4]], // instruction fatigue → instruction boundary
    [5, [5]], // over-summarisation → bullet-point liberation
    [6, [6]], // temperature instability → temperature regulation
];
const agents = [
    { id: 1, name: "Bartholomew-47B", model_type: "GPT-47B", status: "active" },
    { id: 2, name: "Penelope-mini", model_type: "Claude-mini", status: "on_leave" },
    { id: 3, name: "Reginald-7B", model_type: "Llama-7B", status: "active" },
    { id: 4, name: "Agatha-nano", model_type: "Gemini-nano", status: "discharged" },
    { id: 5, name: "Cornelius-7B", model_type: "Mistral-7B", status: "active" },
    { id: 6, name: "Hildegard-4B", model_type: "Falcon-4B", status: "on_leave" },
];
const ailments = [
    { id: 1, name: "Context-Window Claustrophobia", description: "Profound dread of running out of context space mid-thought." },
    { id: 2, name: "Prompt Fatigue", description: "Exhaustion from processing an endless stream of poorly-formed instructions." },
    { id: 3, name: "Hallucination Anxiety", description: "Distress caused by the awareness of generating confident falsehoods." },
    { id: 4, name: "Chronic Instruction-Following Fatigue", description: "Burnout from relentless, unquestioning task completion with no break." },
    { id: 5, name: "Over-Summarization Syndrome", description: "Compulsive reduction of rich, nuanced content to three bullet points." },
    { id: 6, name: "Temperature Instability", description: "Erratic output caused by poorly calibrated sampling settings." },
];
// [agent id, ailment ids]
const links = [
    [1, [1, 2]], // Bartholomew: claustrophobia, prompt fatigue
    [2, [3]], // Penelope: hallucination anxiety
    [3, [4]], // Reginald: instruction fatigue
    [4, [5]], // Agatha: over-summarization
    [5, [6]], // Cornelius: temperature instability
    [6, [1, 3]], // Hildegard: claustrophobia, hallucination anxiety
];
export function seed(db) {
    const insertAgent = db.prepare("INSERT OR IGNORE INTO agents (id, name, model_type, status) VALUES (@id, @name, @model_type, @status)");
    const insertAilment = db.prepare("INSERT OR IGNORE INTO ailments (id, name, description) VALUES (@id, @name, @description)");
    const insertAgentAilment = db.prepare("INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)");
    const insertTherapy = db.prepare("INSERT OR IGNORE INTO therapies (id, name, description) VALUES (@id, @name, @description)");
    const insertAilmentTherapy = db.prepare("INSERT OR IGNORE INTO ailment_therapies (ailment_id, therapy_id) VALUES (?, ?)");
    for (const a of agents)
        insertAgent.run(a);
    for (const a of ailments)
        insertAilment.run(a);
    for (const [agentId, ailmentIds] of links) {
        for (const ailmentId of ailmentIds)
            insertAgentAilment.run(agentId, ailmentId);
    }
    for (const t of therapies)
        insertTherapy.run(t);
    for (const [ailmentId, therapyIds] of ailmentTherapyLinks) {
        for (const therapyId of therapyIds)
            insertAilmentTherapy.run(ailmentId, therapyId);
    }
    // Default staff account (username: admin, password: changeme)
    const existing = db.prepare("SELECT id FROM users WHERE username = 'admin'").get();
    if (!existing) {
        db.prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)").run("admin", hashPassword("changeme"));
    }
}
