const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { select } = wp.data
const { SelectControl } = wp.components
const { useEffect, useState } = wp.element

const Edit = ({attributes, setAttributes}) => {

  return <div className="BlockApp">
    APP                                                     
  </div>
}

registerBlockType(
  'tpyts/app',
  {
    title: __('App', 'tpyts'),
    icon: 'marker',
    category: 'tpyts',
    attributes: {}, 
    edit: Edit,
    save({ attributes }) {

      return null
    }
  }
)