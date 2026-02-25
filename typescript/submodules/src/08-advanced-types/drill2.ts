type HasId = { id: string }

type HasTimestamps = { createdAt: Date; updatedAt: Date }

type Entity = HasId & HasTimestamps;

const entity:Entity = {
id:"1r",
createdAt:new Date(),
// updatedAt:new Date()
}

// error :- updatedAt is missing in type