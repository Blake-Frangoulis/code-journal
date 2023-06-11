/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem('journal-local-storage', stringifiedData);
});

const previousStringifiedData = localStorage.getItem('journal-local-storage');
if (previousStringifiedData !== null) {
  data = JSON.parse(previousStringifiedData);
}
