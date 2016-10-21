var React = require('react');
var ReactNative = require('react-native')
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  StatusBarIOS,
} = ReactNative;

var RefreshableListView = require('react-native-refreshable-listview')
var delay = require('react-native-refreshable-listview/lib/delay')

// make an array containing a sequence of numbers from 0..n
var makeSequence = (n) => Array.apply(null, {length: n}).map((v, i) => i)

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.text !== r2.text
})

var RefreshableListViewTest = React.createClass({
  getInitialState() {
    var rows = makeSequence(100).map((n) => ({text: 'not refreshed '+n}))
    return {dataSource: ds.cloneWithRows(rows)}
  },
  componentDidMount() {
    StatusBarIOS.setStyle(0)
  },
  reloadItems() {
    return delay(1000).then(() => {
      var rows = makeSequence(100).map((n) => ({text: 'refreshed '+n}))
      this.setState({dataSource: ds.cloneWithRows(rows)})
    })
  },
  renderItem(item) {
    return (
      <View style={{height: 40, backgroundColor: '#ffffff', borderWidth: 0.5, borderColor: '#d6d7da'}}>
        <Text>
          {item.text}
        </Text>
      </View>
    )
  },
  render() {
    return (
      <View style={{marginTop: 20}}>
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          loadData={this.reloadItems}
          refreshDescription="Refreshing items"
          refreshPrompt="Pull down to refresh"
        />
      </View>
    )
  },
});

AppRegistry.registerComponent('RefreshableListViewTest', () => RefreshableListViewTest);
