import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// COPY TYPES FROM typesExpored.ts
// TODO rename types
export interface AnswerData {
    easy?: number
    okay?: number
    hard?: number
}

export interface DefinitionData {
    [definition: string]: AnswerData
}

export interface LevelData {
    [word: string]: DefinitionData
}

export interface UserWordData {
    beginner?: LevelData
    intermediate?: LevelData
    advanced?: LevelData
    custom?: LevelData
}

admin.initializeApp()
const db = admin.firestore()

exports.newUserToFirestore = functions.auth.user().onCreate((user: any) => {
    const userID = user.uid
    console.log(
        'New user registration. Firestore document created with user ID: ' +
            userID
    )

    // TODO return message
    return admin
        .firestore()
        .collection('users')
        .doc(userID)
        .set({ theme: 'light' })
})

exports.updateUserTheme = functions.https.onCall((data, context) => {
    const { userId, theme } = data

    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'User must be authenticated to update theme.'
        )
    }

    if (!['light', 'dark'].includes(theme)) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Theme must be "light" or "dark".'
        )
    }

    // TODO return message
    return admin
        .firestore()
        .collection('users')
        .doc(userId)
        .update({ theme })
        .catch((error) => {
            console.error('Error updating theme:', error)
            throw new functions.https.HttpsError(
                'unknown',
                'Failed to update theme.'
            )
        })
})

exports.getUserTheme = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'User must be authenticated to get their theme.'
        )
    }

    const userId = context.auth.uid

    try {
        const userDoc = await admin
            .firestore()
            .collection('users')
            .doc(userId)
            .get()

        if (!userDoc.exists) {
            throw new functions.https.HttpsError(
                'not-found',
                'User document does not exist.'
            )
        }

        const theme = userDoc.data()?.theme

        if (!theme) {
            throw new functions.https.HttpsError(
                'not-found',
                'Theme field is missing for the user.'
            )
        }

        return { theme }
    } catch (error) {
        console.error('Error fetching user theme:', error)
        throw new functions.https.HttpsError(
            'unknown',
            'An error occurred while fetching the theme.'
        )
    }
})

exports.setWordData = functions.https.onCall(async (data) => {
    const { userId, level, word, definition, difficulty } = data

    if (!userId || !level || !word || !definition) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Missing required parameters: userId, level, word, or definition.'
        )
    }

    if (!['beginner', 'intermediate', 'advanced', 'custom'].includes(level)) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            `Level must be one of 'beginner', 'intermediate', 'advanced', 'custom'.`
        )
    }

    try {
        const wordDocRef = admin
            .firestore()
            .collection('users')
            .doc(userId)
            .collection(level)
            .doc(word)

        const defDocRef = wordDocRef.collection('definitions').doc(definition)

        await db.runTransaction(async (transaction) => {
            const wordDoc = await transaction.get(wordDocRef)
            const defDoc = await transaction.get(defDocRef)

            if (!wordDoc.exists) {
                transaction.set(wordDocRef, {
                    // TODO do I need this?
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                })
            }

            if (defDoc.exists) {
                transaction.update(defDocRef, {
                    [difficulty]: admin.firestore.FieldValue.increment(1),
                })
            } else {
                transaction.set(defDocRef, {
                    [difficulty]: 1,
                })
            }
        })

        return {
            success: true,
            message: `${word} (${definition}) saved sucessfully.`,
        }
    } catch (error) {
        console.error('Error creating/updating Firestore document:', error)
        throw new functions.https.HttpsError(
            'internal',
            'Unable to update data.'
        )
    }
})

exports.getUserWordsData = functions.https.onCall(
    async (data, context): Promise<UserWordData> => {
        const userAuth = context.auth

        if (!userAuth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                'You must be authenticated.'
            )
        }

        console.log('uid: ', userAuth.uid)

        const levels = [
            'beginner',
            'intermediate',
            'advanced',
            'custom',
        ] as const

        const userWords: UserWordData = {}

        const promLevels = levels.map(async (level) => {
            const levelRef = db
                .collection('users')
                .doc(userAuth.uid)
                .collection(level)

            const levelSnap = await levelRef.get()

            if (levelSnap.empty) {
                console.log(level + ' empty')
                return
            }

            const levelWords: LevelData = {}

            const promDefinitions = levelSnap.docs.map(async (wordDoc) => {
                const definitionsRef = levelRef
                    .doc(wordDoc.id)
                    .collection('definitions')

                console.log('wrod: ', wordDoc.id)

                const definitionsSnap = await definitionsRef.get()

                const definitions: DefinitionData = {}

                definitionsSnap.forEach((definitionDoc) => {
                    definitions[definitionDoc.id] =
                        definitionDoc.data() as AnswerData
                })

                levelWords[wordDoc.id] = definitions
            })

            await Promise.all(promDefinitions)

            userWords[level] = levelWords
        })

        await Promise.all(promLevels)

        return userWords
    }
)

/////////////// DOCUMENTS IN BEGINNER DON'T REALLY EXIST FOR SOME FUCKING REASON????
/////////////// DOCUMENTS IN BEGINNER DON'T REALLY EXIST FOR SOME FUCKING REASON????
/////////////// DOCUMENTS IN BEGINNER DON'T REALLY EXIST FOR SOME FUCKING REASON????
/////////////// DOCUMENTS IN BEGINNER DON'T REALLY EXIST FOR SOME FUCKING REASON????
/////////////// DOCUMENTS IN BEGINNER DON'T REALLY EXIST FOR SOME FUCKING REASON????

exports.test = functions.https.onCall(async (data, context) => {
    const userAuth = context.auth

    if (!userAuth) {
        console.log('Authentication failed or no user is authenticated.')
        return { error: 'User is not authenticated.' }
    }

    console.log('Authenticated user UID:', userAuth.uid)

    try {
        const snapshot = await db
            .collection('users')
            .doc(userAuth.uid)
            .collection('beginner')
            .get()

        if (snapshot.empty) {
            console.log(
                `No documents found in 'beginner' collection for user UID: ${userAuth.uid}`
            )
            return { message: 'No documents found in beginner collection.' }
        }

        const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        console.log('Retrieved documents:', docs)

        return {
            docs,
            userId: userAuth.uid,
            message: 'Documents successfully retrieved.',
        }
    } catch (error) {
        console.error('Error retrieving documents:', error)
        return { error: 'Failed to retrieve documents.' }
    }
})
