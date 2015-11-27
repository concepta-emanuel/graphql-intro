import * as _ from 'underscore';

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

const Author = new GraphQLObjectType({
  name: "Author",
  description: "Represent the type of an author of a blog post or a comment",
  fields: () => ({
    _id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString}
  })
});

let schema = new GraphQLSchema({
  
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        resolve: function() {
          return count;
        }
      }
    }
  }),
  
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateCount: {
        type: GraphQLInt,
        description: 'Updates the count',
        resolve: function() {
          count += 1;
          return count;
        }
      },
      postAuthor: {
        type: Author,
        description: "Create a new author",
        args: {
          firstName: {type: GraphQLString},
          lastName: {type: GraphQLString},
          email: {type: GraphQLString}
        },
        resolve: function(source, args) {

          return author;
        }
      }      
    }
  })
  
});

export default schema;