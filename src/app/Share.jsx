import React from 'react';
import ReactDOM from 'react-dom';

const Share = React.createClass({
    cutStr: function(string) {
        if (!string) {
            return 'Нет описания';
        } else {
            let result = '';
            let first = string.slice(0, 130);
            let second = string.slice(130);
            if (first[129] === '.' || string.length <= 130) {
                result = first;
            } else {
                let substrs = second.split('.');
                result = first + substrs[0] + '.';
            }
            return result;
        }
    },

    componentDidMount:function(){
        let that = ReactDOM.findDOMNode(this);
        Ya.share2(that, {
            content: {
                url: 'http://foto1945.mir24.tv/photo/'+this.props.contrID,
                title: this.props.persons,
                description: this.cutStr(this.props.description),
                image: 'http://foto1945.mir24.tv'+this.props.image,
            },
            theme: {
                services:'vkontakte,facebook,odnoklassniki',
            },
        });
    },
    render: function() {
        return <div id="share2">
        </div>;

    },
});
module.exports = Share;