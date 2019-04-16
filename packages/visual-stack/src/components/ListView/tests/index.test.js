import React from 'react';
import Enzyme, { mount } from 'enzyme';
import ListView from '../';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('List View', () => {
  it('should render items as a list view', () => {
    const wrapper = mount(
      <ListView
        data={[{ name: 'CJ' }, { name: 'Affiliate' }]}
        renderContent={item => <div>{item.name}</div>}
      />
    );
    const texts = wrapper
      .find('div.vs-list-item')
      .map(element => element.text());
    expect(texts).toEqual(['CJ', 'Affiliate']);
  });

  it('should not render items with clickable style when there is no onClick handler', () => {
    const wrapper = mount(
      <ListView
        data={[{ name: 'CJ' }, { name: 'Affiliate' }]}
        renderContent={item => <div>{item.name}</div>}
      />
    );
    expect(wrapper.find('div.vs-list-item-clickable')).toHaveLength(0);
  });

  it('should render clickable list items when there is an onClick handler', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <ListView
        data={[{ name: 'CJ' }, { name: 'Affiliate' }]}
        renderContent={item => <div>{item.name}</div>}
        onClick={onClick}
      />
    );
    expect(wrapper.find('div.vs-list-item-clickable')).toHaveLength(2);
  });

  it('should call onClick when I click on a list item', () => {
    const onClick = jest.fn();
    const item = { name: 'CJ' };
    const wrapper = mount(
      <ListView
        data={[item]}
        renderContent={item => <div>{item.name}</div>}
        onClick={onClick}
      />
    );
    wrapper.find('div.vs-list-item-clickable').simulate('click');
    expect(onClick.mock.calls).toEqual([[item]]);
  });

  it('should not break if I click on a list item without onClick handler', () => {
    const item = { name: 'CJ' };
    const wrapper = mount(
      <ListView data={[item]} renderContent={item => <div>{item.name}</div>} />
    );
    wrapper.find('div.vs-list-item').simulate('click');
  });

  it('should render header if there is a header render props', () => {
    const item = { name: 'CJ' };
    const wrapper = mount(
      <ListView
        data={[item]}
        renderContent={() => null}
        renderHeader={() => <div>header</div>}
        renderFooter={() => <div>footer</div>}
      />
    );
    expect(wrapper.find('div.vs-list-view-header').text()).toEqual('header');
    expect(wrapper.find('div.vs-list-view-footer').text()).toEqual('footer');
  });
});