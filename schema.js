import * as _ from 'underscore';

import mongo from 'promised-mongo';

// You can use any MONGO_URL here, whether it's locally or on cloud.
let db = mongo('mongodb://192.241.185.168/graphql-custom');

let authorsCollection = db.collection('authors');

import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLInterfaceType
} from 'graphql/type';
import GraphQLDateType from 'graphql-custom-datetype';

let count = 0;

let Author = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a blog post or a comment',
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    twitterHandle: {type: GraphQLString}
  })
});

let Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    authors: {
      type: new GraphQLList(Author),
      resolve: function(rootValue, args, info) {
        
        let fields = {};
        let fieldASTs = info.fieldASTs;
        fieldASTs[0].selectionSet.selections.map(function(selection) {
          fields[selection.name.value] = 1;
        });
        return authorsCollection.find({}, fields).toArray();
        
      }
    }
  }
});

let Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createAuthor: {
      type: Author,
      args: {
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        twitterHandle: {type: GraphQLString}
      },
      resolve: function(rootValue, args) {
        let author = Object.assign({}, args);
        return authorsCollection.insert(author)
          .then(_ => author);
      }
    }
  }
});

let Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;