import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';

describe('parallelism: second worker', () => {
  let firestore: Firestore;

  beforeAll(() => {
    const app = initializeApp();
    firestore = getFirestore(app);
  });

  it('should have separate database', async () => {
    const collection = firestore.collection('parallelism-test');

    await Promise.all([collection.add({ a: 1 }), collection.add({ b: 2 })]);

    const snapshot = await collection.count().get();

    expect(snapshot.data().count).toBe(2);
  });
});
