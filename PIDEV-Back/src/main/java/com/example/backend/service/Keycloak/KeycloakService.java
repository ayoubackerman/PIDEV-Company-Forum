package com.example.backend.service.Keycloak;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.*;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class KeycloakService {


    @Autowired
    private Keycloak keycloak;
    public void updateUser(String userId, UserRepresentation user) {
        RealmResource realmResource = keycloak.realm("Pi-Dev");
        UsersResource usersResource = realmResource.users();
        UserResource userResource = usersResource.get(userId);
        userResource.update(user);
    }
    public UserRepresentation getUserById(String userId) {
        RealmResource realmResource = keycloak.realm("Pi-Dev");
        UsersResource usersResource = realmResource.users();
        UserResource userResource = usersResource.get(userId);
        System.out.println(userId + "???????????????????");
        return userResource.toRepresentation();
    }

    public void removeRoleFromUser(String username, String roleName) {
        UserRepresentation user = keycloak.realm("Pi-Dev").users().search(username).get(0);
        RoleRepresentation role = keycloak.realm("Pi-Dev").roles().get(roleName).toRepresentation();
        keycloak.realm("Pi-Dev").users().get(user.getId()).roles().realmLevel().remove(Arrays.asList(role));
    }


    public void createRole(String roleName) {
        RealmResource realmResource = keycloak.realm("Pi-Dev");
        RoleRepresentation role = new RoleRepresentation();
        role.setName(roleName);
        role.setClientRole(false); // set to true if client role
        realmResource.roles().create(role);
    }


    public List<UserRepresentation> getUsersByRole(String roleName) {
        RealmResource realmResource = keycloak.realm("Pi-Dev");
        RolesResource rolesResource = realmResource.roles();
        RoleResource roleResource = rolesResource.get(roleName);

        if (roleResource == null) {
            // Role not found, handle the error accordingly
            return Collections.emptyList();
        }

        List<UserRepresentation> users = roleResource.getRoleUserMembers().stream().toList();
        return users;
    }
}
