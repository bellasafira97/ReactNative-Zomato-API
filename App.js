import React, {Component} from 'react';
import {Container, Header, Content, Footer, Thumbnail,
Body, Text, Icon, Button, Input, Item, List, Left, Right, CardItem, Card} from 'native-base';
import {Image} from 'react-native';
import axios from 'axios';

class App extends Component {
  state = {
    nama_makanan:'',
    restoran : [],
    nogambar: require('./Image/2.png')
}
  getapi = () =>{
    // Alert.alert(this.state.nama);
    var url = ` https://developers.zomato.com/api/v2.1/search?q=${this.state.nama_makanan}`
    var config = {
      headers:{'user-key':'e785c664202ea27566799691784ce956'}
    };
    axios.get(url, config).then((x)=>{
     
        this.setState({
          restoran : x.data.restaurants
        })
    
  })
}
  
  render(){
    var dataRestoran = this.state.restoran.map((val, i)=>{
      var nama_restoran = val.restaurant.name
      var kota_restoran = val.restaurant.location.city
      var alamat = val.restaurant.location.address
      var harga = val.restaurant.average_cost_for_two
      var gambar = val.restaurant.thumb

      return(
          <Card key={i} style={{padding:15}}>
            <CardItem>
              <Left>
                <Thumbnail square source={gambar ? {uri:gambar} : require('./Image/2.png')} />
                <Body>
                  <Text>{nama_restoran}</Text>
                  <Text note>{kota_restoran}</Text>
                </Body>
              </Left>
              <Right>
              <Text>Rp.{harga}</Text>
            </Right>
            </CardItem>

            <CardItem cardBody>
              <Image source={gambar ? {uri:gambar} : require('./Image/2.png')} style={{height: 250, width: null, flex: 1}}/>
            </CardItem>
            
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                </Button>
                <Text>{alamat}</Text>
              </Left>
              
            </CardItem>
          </Card>


      )
    })
    return(
      <Container style={{backgroundColor:'lightpink'}}>
          
        <Header searchBar rounded style={{backgroundColor:'#DC143C'}}>
          <Item>
            <Icon name='search'/>
            <Input placeholder='Cari menu makanan...'
            onChangeText={(e)=>{this.setState({nama_makanan: e})}}/>
          </Item>
        </Header>
        
          <Button full style={{backgroundColor:'#DC143C', marginTop:5}}
          onPress={this.getapi}>
            <Text>Lihat Daftar Resto</Text>
          </Button>

        <Content style={{marginTop: 10}}>
        <List>
            {dataRestoran}
        </List>
        </Content>
      </Container>
    )
  }
}

export default App;