export const catalog = Array.from({ length: 4 }, (_, i) => ({
  id: `mission-${i + 1}`, order: i + 1, title: `Situação fictícia ${i + 1}`, objective: 'Distinguir dados e riscos', skill: 'EF08CO08', complexity: 'Analisar o contexto', focus: ['identify','assess','decide','integrate'][i], shortFeedback:{identify:'Nome é pessoal.',assess:'Pode identificar.',decide:'Retire o nome.'},
  context: { kind: 'social-profile', introduction: 'Simulação fictícia', elements: [{ id: 'profile', kind: 'profile', text: 'Perfil fictício' }] },
  personalData: [{ id: 'name', label: 'Nome', category: 'identification', elementIds: ['profile'] }],
  risks: [{ id: 'contact', explanation: 'Identificação indesejada', datumIds: ['name'] }],
  questions: ['identify', 'assess', 'decide'].map(dimension => ({
    id: `${i + 1}-${dimension}`, dimension, prompt: 'Escolha a opção', selectionMode: dimension === 'decide' ? 'single' : 'multiple', expectedOptionIds: ['yes'],
    options: ['yes', 'no'].map(id => ({ id, label: id, elementIds: [], datumIds: [], riskIds: [], explanation: { whenSelected: 'Explicação da escolha', whenOmitted: 'Explicação da omissão' } }))
  })), synthesis: { dataExplanation: 'Nome é um dado', riskExplanation: 'Pode identificar', protectionExplanation: 'Reduza a exposição' },
  integratedMissionIds: i === 3 ? Array.from({ length: 3 }, (_, j) => `mission-${j + 1}`) : []
}));
