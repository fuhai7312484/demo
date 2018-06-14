import React,{Component} from 'react';
import './1.css';
import List from './list';
import {addData,changeAll,remove,sortAction} from './ations';
class App extends Component {

    add = () => {
        let {store:{dispatch}} = this.props;
        let {name,age} = this.refs;
        dispatch(addData(name.value,age.value));
        name.value = age.value = '';
    }

    all = (ev) => {
        let {store:{dispatch}} = this.props;
        let {checked} = ev.target;
        dispatch(changeAll(checked));
    }

    remove = () => {
        let {store:{dispatch}} = this.props;
        dispatch(remove());
    }

    sort = () => {
        let {s1,s2} = this.refs;
        let {store:{dispatch}} = this.props;
        dispatch(sortAction(s1.value,s2.value));
        // console.log(s1.value);

    }

    render() { 
        let {store} = this.props;
        let arr = store.getState().reduers1;

        let newArr = arr.map((e,i)=>{
            return (
                <List {...{
                    checked:e.checked,
                    id:e.id,
                    name:e.name,
                    age:e.price,
                    key:i,
                    store
                }}/>
            )
        });

       
        return (
            <section className="tBody">
                <h1 className="title">你妹带你玩Redux</h1>
                <ul id="header">
                    <li className="addPre">
                        <label>名字：
                            <input 
                                type="text" 
                                id="name" 
                                ref="name"
                            />
                        </label>
                        <label>年龄：
                            <input 
                                type="text" 
                                id="age" 
                                ref="age"
                            />
                        </label>
                        <input 
                            type="button" 
                            value="添加" 
                            id="add"
                            onClick={this.add} 
                        />
                    </li>
                    <li>
                        <span>排序</span>
                        <select id="s1" ref="s1">
                            <option value="price">年龄</option>
                            <option value="id">编号</option>
                        </select>
                        <select id="s2" ref="s2">
                            <option value="2">从高到底</option>
                            <option value="1">从低到高</option>
                        </select>
                        <input 
                            type="button" 
                            value="提交" 
                            id="stBtn" 
                            onClick={this.sort}
                        />
                        <input 
                            type="button" 
                            value="批量删除" 
                            id="rm" 
                            onClick={this.remove}
                        />
                    </li>
                </ul>
                <table id="tab" width="600" align="center" border="1">
                    <thead>
                        <tr>
                            <th>全选
                                <input 
                                    type="checkbox" 
                                    id="checkAll"
                                    checked={arr.length?arr.every(e=>e.checked):false}
                                    onChange={this.all}
                                />
                            </th>
                            <th index="id">编号</th>
                            <th>商品</th>
                            <th index="price">年龄</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="tb">
                        {newArr}
                    </tbody>
                    </table>
            </section>
        )
    }
}
 
export default App;