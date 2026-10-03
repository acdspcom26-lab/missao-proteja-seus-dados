export const patterns = { adequate: [4, 4, 4], inadequate: [0, 0, 0], mixed: [1, 2, 3] };
export function answersFor(catalog, counts) {
  return catalog.flatMap((m, i) => m.questions.map((q, d) => ({ missionId: m.id, questionId: q.id, dimension: q.dimension, selectedOptionIds: i < counts[d] ? [...q.expectedOptionIds] : [q.options.find(o => !q.expectedOptionIds.includes(o.id)).id] })));
}
