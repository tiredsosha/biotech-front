module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Zones', [
      {
        rusName: 'Эфиромасличные', zoneName: 'etherium', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Симуляция', zoneName: 'simulation', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Мировые вызовы', zoneName: 'calls', status: 'OK', powerValue: false, soundValue: false,
      },
      {
        rusName: 'ДНК Левая', zoneName: 'dna_left', status: 'OK', powerValue: false,
      },
      {
        rusName: 'ДНК Правая', zoneName: 'dna_right', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Биореактор', zoneName: 'reactor', status: 'OK', powerValue: false, soundValue: false,
      },
      {
        rusName: 'Фуднет', zoneName: 'foodnet', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Биоматериалы', zoneName: 'biomaterials', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Медицина', zoneName: 'medicine', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Биолюминисценция', zoneName: 'biolum', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Биотехнология', zoneName: 'biotech', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Биоразлагаемость', zoneName: 'biorecycle', status: 'OK', powerValue: false,
      },
      {
        rusName: 'Сити-ферма', zoneName: 'cityfarm', status: 'OK', powerValue: false, soundValue: false, ledValue: false,
      },
      {
        rusName: 'Будущее', zoneName: 'future', status: 'OK', powerValue: false, soundValue: false,
      },
      {
        rusName: 'Генетика', zoneName: 'genetic', status: 'OK', powerValue: false, soundValue: false,
      },
      {
        rusName: 'Биоремедиация', zoneName: 'bioremediation', status: 'OK', powerValue: false, soundValue: false,
      },
      {
        rusName: 'Клонирование', zoneName: 'cloning', status: 'OK', powerValue: false, soundValue: false,
      },
      {
        rusName: 'Гаприн', zoneName: 'gaprin', status: 'OK', powerValue: false,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Zones', null, {});
  },
};
