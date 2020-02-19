import React from 'react';
import { FlatList, ActivityIndicator, View, Image, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';
import RedemptionSkusModel from "../../services/OstJsonApiPagination/RedemptionSkusModel";
import Pagination from '../../services/OstJsonApiPagination/Pagination';

class SkusList extends React.PureComponent{
    constructor( props ){
        super(props);
        this.userId = this.props.userId;
        if(!this.userId) return;
        this.redemptionSkusModel = null ;
        this.pagination = null;
        this.init();
        this.state = {
            list: null,
            loadingNext: false,
            refreshing: false
        };
        this.noDataCell = {
            isEmpty: true
        }
    }

    init(){
        this.redemptionSkusModel = new RedemptionSkusModel(this.userId);
        this.pagination  = new Pagination( this.redemptionSkusModel ,{
            beforeRefresh : this.beforeRefresh ,
            onRefresh : this.onRefresh ,
            onRefreshError: this.onRefreshError,
            beforeNext: this.beforeNext,
            onNext: this.onNext,
            onNextError : this.onNextError
        } );
        this.pagination && this.pagination.initPagination();
    }

    onItemClick = (item) => {
        this.props.onItemClick && this.props.onItemClick(item);
    }

    _renderItem = ({item, index}) => {
        if(item.isEmpty){
            return (<View>No items found!!!</View>);
        }
        let imageUrl = (item.image && item.image.list.original.url) || '';
        return (
            <TouchableWithoutFeedback onPress={()=>{this.onItemClick(item)}}>
                <View style={{flex: 0.5, width: 160, height: 160}}>
                    <View style={{flex: 1, margin: 5, backgroundColor: '#B3B3B3', alignItems:'center', justifyContent: 'center'}}>
                        {imageUrl ? <Image source={{uri: imageUrl }} resizeMode={'cover'} style={{width: '100%', height: '100%'}} />: <React.Fragment/>}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    getResults = () => {
        let results = this.pagination.modelFetch.getAllResults();
        return results.length == 0 ? [this.noDataCell] : results;
    }

    beforeRefresh = ( ) => {
        this.setState({ refreshing : true });
    }

    onRefresh = ( res ) => {
        this.setState({ refreshing : false, list : this.getResults() });
    }

    onRefreshError = ( error ) => {
        this.setState({ refreshing : false });
    }

    beforeNext =() => {
        this.setState({ loadingNext : true });
    }

    onNext = ( res  ) => {
        this.setState({ loadingNext : false ,  list : this.getResults() });
    }

    onNextError = ( error ) => {
        this.setState({ loadingNext : false });
    }

    getNext = () => {
      this.pagination.getNext();
    }

    refresh = () => {
        this.pagination.refresh();
    }
    
    _keyExtractor = ({item, index})=> {
        return `id_${index}`
    }

    renderFooter = () => {
        if (!this.state.loadingNext) return null;
        return <ActivityIndicator />;
    };

    render = () => {
        return (
                <FlatList
                    style={styles.list}
                    data={this.state.list}
                    onEndReached={this.getNext}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                    onEndReachedThreshold={9}
                    renderItem={this._renderItem}
                    ListFooterComponent={this.renderFooter}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={ListHeaderComponent}
                />
        )
    }
}


const ListHeaderComponent = (props) => (
    <View styles={styles.headingWrapper}>
    {/* TODO customise  */}
      {props.logo ? <Image source={props.logo} style={styles.logoSkipFont} /> : <React.Fragment/>}
      <Text style={styles.title}>{props.title}Decrypt Gift Card Options</Text>  
      <Text style={styles.description}>{props.description}Buy coupons and get great deals by using the tokens you have earned</Text> 
    </View>
)

export default SkusList;