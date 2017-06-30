import React, { Component } from 'react';
import Table  from 'react-bootstrap/lib/Table';
import Label  from 'react-bootstrap/lib/Label';



class ChannelStatisticsBar extends Component {


  render() {
    const {channel} = this.props;
    const publishedCut = channel.snippet.publishedAt.slice(0,10);

    const view = "" + channel.statistics.viewCount;
    const viewNew = view.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const comment = "" + channel.statistics.commentCount;
    const commentNew = comment.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const subscriber = "" + channel.statistics.subscriberCount;
    const subscriberNew = subscriber.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const video = "" + channel.statistics.videoCount;
    const videoNew = video.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    return (
                <Table bordered responsive>
                    <thead>
                            <tr>
                                <th><h4><Label bsStyle="default" bsSize="small">Параметр</Label></h4> </th>
                                <th><h4><Label bsStyle="default" bsSize="small">Значение</Label></h4></th>
                            </tr>
                    </thead>
                    <tbody>
                            {channel.snippet.country ? 
                            (  
                                <tr>
                                    <td><h4><Label bsStyle="info" bsSize="small">Страна</Label></h4></td>
                                    <td><h4><Label bsStyle="success" bsSize="small"> {channel.snippet.country}</Label></h4></td>
                                </tr>
                                ) : null
                            }
                            {(channel.snippet.viewCount !== 0) ? 
                            (  
                                <tr>
                                    <td><h4><Label bsStyle="info" bsSize="small">Просмотров</Label></h4></td>
                                    <td><h4><Label bsStyle="success" bsSize="small">{viewNew}</Label></h4></td>
                                </tr>
                            ) : null
                            }
                            {(channel.snippet.commentCount !== 0) ? 
                            (  
                                <tr>
                                    <td><h4><Label bsStyle="info" bsSize="small">Комментариев</Label></h4></td>
                                    <td> <h4><Label bsStyle="success" bsSize="small">{commentNew}</Label></h4></td>
                                </tr>
                            ) : null
                            }
                            {(channel.snippet.subscriberCount !== 0) ? 
                            (  
                                <tr>
                                    <td><h4><Label bsStyle="info" bsSize="small">Подписок</Label></h4></td>
                                    <td><h4><Label bsStyle="success" bsSize="small"> {subscriberNew}</Label></h4></td>
                                </tr>
                            ) : null
                            }
                                <tr>
                                    <td><h4><Label bsStyle="info" bsSize="small">Число видео</Label></h4></td>
                                    <td><h4><Label bsStyle="success" bsSize="small"> {videoNew}</Label></h4></td>
                                </tr>
                                <tr>
                                    <td><h4><Label bsStyle="info" bsSize="small">Опубликовано</Label></h4></td>
                                    <td><h4><Label bsStyle="success" bsSize="small"> {publishedCut}</Label></h4></td>
                                </tr>
                    </tbody>
                </Table>
    );
  }
}

export default ChannelStatisticsBar;
