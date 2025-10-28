import PropTypes from 'prop-types';

export const menuItemPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  createdAt: PropTypes.string
});

export const navigationPropTypes = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
});
