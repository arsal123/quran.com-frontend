import React from 'react';
import ReactDOM from 'react-dom';
import { mountWithIntl } from '../../../tests/helpers/intl-enzyme-test-helper.js';

import ContentDropdown, { slugs } from './index';

let wrapper;
let onOptionChange = sinon.stub();
let defaultOption = 19

describe('<ContentDropdown />', () => {
  beforeEach(() => {
    onOptionChange = sinon.stub();
    wrapper = mountWithIntl(<ContentDropdown options={{content: [defaultOption]}} onOptionChange={onOptionChange} />);
  });

  it('should render', () => {
    expect(wrapper).to.be.ok;
  });

  it('should contain all the content options', () => {
    slugs.filter(slug => slug.language !== 'ar').forEach(slug => {
      expect(wrapper.text()).to.contain(slug.name);
    });
  });

  it('should show chosen content option', () => {
    expect(wrapper.find(`#${defaultOption}en`).prop('checked')).to.equal(defaultOption);
  });

  it('should add option when clicked', () => {
    const id = 18;
    wrapper.find(`#${id}en`).simulate('change');

    expect(onOptionChange).to.have.been.called;
    expect(onOptionChange).to.have.been.calledWith({content: [defaultOption, id]});
  });

  it('should remove option when clicked', () => {
    wrapper.find(`#${defaultOption}en`).simulate('change');

    expect(onOptionChange).to.have.been.called;
    expect(onOptionChange).to.have.been.calledWith({content: []});
  });

  it('should remove all content', () => {
    const removeAll = wrapper.find({eventKey: 1})
    expect(removeAll.html()).to.contain('Remove all');

    removeAll.simulate('click');

    expect(onOptionChange).to.have.been.called;
    expect(onOptionChange).to.have.been.calledWith({content: []});
  });
});
